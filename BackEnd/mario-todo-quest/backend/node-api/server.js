const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const PUBLIC_DIR = path.resolve(ROOT, '../../frontend');
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'Data');
const DB_PATH = path.join(DATA_DIR, 'todo.db');
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean);
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS Tasks (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL CHECK(length(Title) BETWEEN 1 AND 150),
    Description TEXT NULL CHECK(Description IS NULL OR length(Description) <= 2000),
    DueDate TEXT NOT NULL,
    DueTime TEXT NULL,
    Priority TEXT NOT NULL CHECK(Priority IN ('Low','Medium','High')),
    Status TEXT NOT NULL CHECK(Status IN ('Todo','InProgress','Done')),
    CreatedAt TEXT NOT NULL,
    UpdatedAt TEXT NOT NULL,
    CompletedAt TEXT NULL
  );
`);

function dateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function seedIfEmpty() {
  if (db.prepare('SELECT COUNT(*) AS count FROM Tasks').get().count > 0) return;
  const today = new Date();
  const now = new Date().toISOString();
  const samples = [
    ['Hoàn thiện bài tập API', 'Rà soát endpoint và validation.', -2, 'High', 'InProgress'],
    ['Đọc chương cơ sở dữ liệu', 'Ghi chú các khái niệm chính.', -1, 'Medium', 'Todo'],
    ['Lập kế hoạch tuần', 'Chọn ba mục tiêu quan trọng.', 0, 'High', 'Done'],
    ['Đi bộ 20 phút', 'Nạp năng lượng giữa giờ.', 0, 'Low', 'Todo'],
    ['Ôn tập C#', 'Luyện tập async và LINQ.', 0, 'Medium', 'InProgress'],
    ['Gửi bài thuyết trình', 'Kiểm tra định dạng lần cuối.', 0, 'High', 'Todo'],
    ['Dọn góc học tập', 'Sắp xếp sách và ghi chú.', 1, 'Low', 'Todo'],
    ['Đọc tài liệu SQLite', 'Ôn lại cách lưu dữ liệu.', 2, 'Medium', 'InProgress'],
    ['Mua sổ ghi chép', 'Chọn sổ nhỏ để mang theo.', 3, 'Low', 'Done'],
    ['Luyện giao tiếp tiếng Anh', 'Nghe podcast 15 phút.', 4, 'Medium', 'Todo'],
    ['Hoàn thành bài thực hành', 'Lưu code bài tập.', 5, 'High', 'InProgress'],
    ['Xem lại mục tiêu tháng', 'Đánh dấu việc đã hoàn tất.', 7, 'Low', 'Todo'],
    ['Sao lưu tài liệu', 'Lưu bản dự phòng.', 8, 'Medium', 'Todo'],
    ['Chuẩn bị nội dung nhóm', 'Tổng hợp ý kiến các thành viên.', 10, 'High', 'Done']
  ];
  const insert = db.prepare(`INSERT INTO Tasks
    (Title, Description, DueDate, DueTime, Priority, Status, CreatedAt, UpdatedAt, CompletedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  db.exec('BEGIN');
  try {
    for (const [title, description, offset, priority, status] of samples) {
      const due = new Date(today);
      due.setDate(due.getDate() + offset);
      insert.run(title, description, dateString(due), '17:00:00', priority, status, now, now, status === 'Done' ? now : null);
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

seedIfEmpty();

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Todo', 'InProgress', 'Done'];
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon'
};

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body === null ? '' : JSON.stringify(body));
}
function sendError(res, status, message, errors) {
  sendJson(res, status, errors ? { message, errors } : { message });
}
function mapTask(row) {
  return {
    id: row.Id, title: row.Title, description: row.Description,
    dueDate: row.DueDate, dueTime: row.DueTime,
    priority: row.Priority, status: row.Status,
    createdAt: row.CreatedAt, updatedAt: row.UpdatedAt, completedAt: row.CompletedAt
  };
}
function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
function validateTask(body) {
  const errors = {};
  if (typeof body?.title !== 'string' || !body.title.trim()) errors.title = ['Tên nhiệm vụ là bắt buộc.'];
  else if (body.title.trim().length > 150) errors.title = ['Tên nhiệm vụ tối đa 150 ký tự.'];
  if (body?.description != null && (typeof body.description !== 'string' || body.description.length > 2000)) errors.description = ['Mô tả tối đa 2000 ký tự.'];
  if (!validDate(body?.dueDate)) errors.dueDate = ['Ngày đến hạn phải có định dạng YYYY-MM-DD hợp lệ.'];
  if (body?.dueTime != null && body.dueTime !== '' && !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.dueTime)) errors.dueTime = ['Giờ phải có định dạng HH:mm.'];
  if (!priorities.includes(body?.priority)) errors.priority = ['Ưu tiên phải là Low, Medium hoặc High.'];
  if (!statuses.includes(body?.status)) errors.status = ['Trạng thái phải là Todo, InProgress hoặc Done.'];
  return errors;
}
function validateStatus(body) {
  return statuses.includes(body?.status) ? {} : { status: ['Trạng thái phải là Todo, InProgress hoặc Done.'] };
}
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1024 * 1024) throw Object.assign(new Error('Nội dung gửi lên quá lớn.'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); }
  catch { throw Object.assign(new Error('JSON gửi lên không hợp lệ.'), { status: 400 }); }
}
function queryTasks(searchParams, today = null) {
  const clauses = [];
  const values = [];
  if (today) { clauses.push('DueDate = ?'); values.push(today); }
  const search = searchParams.get('search')?.trim();
  if (search) { clauses.push('(Title LIKE ? OR Description LIKE ?)'); values.push(`%${search}%`, `%${search}%`); }
  const status = searchParams.get('status');
  if (statuses.includes(status)) { clauses.push('Status = ?'); values.push(status); }
  const priority = searchParams.get('priority');
  if (priorities.includes(priority)) { clauses.push('Priority = ?'); values.push(priority); }

  const sortBy = searchParams.get('sortBy');
  const direction = searchParams.get('sortDirection')?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  const sort = sortBy === 'priority'
    ? `CASE Priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END ${direction}, DueDate ASC`
    : sortBy === 'title'
      ? `Title ${direction}`
      : `DueDate ${direction}, DueTime ${direction}`;
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return db.prepare(`SELECT * FROM Tasks ${where} ORDER BY ${sort}`).all(...values).map(mapTask);
}
function summary(today) {
  const rows = db.prepare('SELECT Status, DueDate FROM Tasks').all();
  const total = rows.length;
  const completed = rows.filter(row => row.Status === 'Done').length;
  return {
    total, completed,
    todo: rows.filter(row => row.Status === 'Todo').length,
    inProgress: rows.filter(row => row.Status === 'InProgress').length,
    overdue: rows.filter(row => row.Status !== 'Done' && row.DueDate < today).length,
    completionRate: total ? Math.round((completed / total) * 1000) / 10 : 0,
    coins: completed * 10
  };
}
function weekly(today) {
  const start = new Date(`${today}T00:00:00`);
  start.setDate(start.getDate() - 6);
  const firstDay = dateString(start);
  const groups = db.prepare(`SELECT DueDate AS date, COUNT(*) AS total,
      SUM(CASE WHEN Status = 'Done' THEN 1 ELSE 0 END) AS completed
    FROM Tasks WHERE DueDate >= ? AND DueDate <= ? GROUP BY DueDate`).all(firstDay, today);
  const byDate = new Map(groups.map(row => [row.date, row]));
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(day.getDate() + index);
    const date = dateString(day);
    const row = byDate.get(date);
    return { date, total: row?.total ?? 0, completed: row?.completed ?? 0 };
  });
}
function prioritiesStats() {
  const counts = new Map(db.prepare('SELECT Priority, COUNT(*) AS count FROM Tasks GROUP BY Priority').all().map(row => [row.Priority, row.count]));
  return priorities.map(priority => ({ priority, count: counts.get(priority) ?? 0 }));
}
function saveTask(res, body, id = null) {
  const errors = validateTask(body);
  if (Object.keys(errors).length) { sendError(res, 400, 'Dữ liệu không hợp lệ.', errors); return; }
  const existing = id == null ? null : db.prepare('SELECT * FROM Tasks WHERE Id = ?').get(id);
  if (id != null && !existing) { sendError(res, 404, 'Không tìm thấy nhiệm vụ.'); return; }
  const now = new Date().toISOString();
  const status = body.status;
  const completedAt = status === 'Done' ? (existing?.CompletedAt || now) : null;
  const values = [body.title.trim(), body.description?.trim() || null, body.dueDate, body.dueTime || null, body.priority, status, now, completedAt];
  let taskId;
  if (id == null) {
    const insertValues = [...values.slice(0, 6), now, now, completedAt];
    const result = db.prepare(`INSERT INTO Tasks (Title, Description, DueDate, DueTime, Priority, Status, CreatedAt, UpdatedAt, CompletedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(...insertValues);
    taskId = Number(result.lastInsertRowid);
  } else {
    db.prepare(`UPDATE Tasks SET Title=?, Description=?, DueDate=?, DueTime=?, Priority=?, Status=?, UpdatedAt=?, CompletedAt=? WHERE Id=?`).run(...values, id);
    taskId = id;
  }
  const saved = mapTask(db.prepare('SELECT * FROM Tasks WHERE Id=?').get(taskId));
  if (id == null) res.setHeader('Location', `/api/tasks/${taskId}`);
  sendJson(res, id == null ? 201 : 200, saved);
}

async function handleApi(req, res, url) {
  const pathname = url.pathname;
  const todayParam = url.searchParams.get('today') || url.searchParams.get('date');
  if (pathname === '/api/tasks' && req.method === 'GET') {
    sendJson(res, 200, queryTasks(url.searchParams)); return;
  }
  if (pathname === '/api/tasks/today' && req.method === 'GET') {
    const today = todayParam || dateString(new Date());
    if (!validDate(today)) { sendError(res, 400, 'Ngày phải có định dạng YYYY-MM-DD hợp lệ.'); return; }
    sendJson(res, 200, queryTasks(url.searchParams, today)); return;
  }
  if (pathname === '/api/statistics/summary' && req.method === 'GET') {
    const today = todayParam || dateString(new Date());
    if (!validDate(today)) { sendError(res, 400, 'Ngày phải có định dạng YYYY-MM-DD hợp lệ.'); return; }
    sendJson(res, 200, summary(today)); return;
  }
  if (pathname === '/api/statistics/weekly' && req.method === 'GET') {
    const today = todayParam || dateString(new Date());
    if (!validDate(today)) { sendError(res, 400, 'Ngày phải có định dạng YYYY-MM-DD hợp lệ.'); return; }
    sendJson(res, 200, weekly(today)); return;
  }
  if (pathname === '/api/statistics/priorities' && req.method === 'GET') {
    sendJson(res, 200, prioritiesStats()); return;
  }

  const statusMatch = pathname.match(/^\/api\/tasks\/(\d+)\/status$/);
  const taskMatch = pathname.match(/^\/api\/tasks\/(\d+)$/);
  if (req.method === 'POST' && pathname === '/api/tasks') {
    saveTask(res, await readBody(req)); return;
  }
  if (statusMatch && req.method === 'PATCH') {
    const id = Number(statusMatch[1]);
    const body = await readBody(req);
    const errors = validateStatus(body);
    if (Object.keys(errors).length) { sendError(res, 400, 'Trạng thái không hợp lệ.', errors); return; }
    const existing = db.prepare('SELECT * FROM Tasks WHERE Id=?').get(id);
    if (!existing) { sendError(res, 404, 'Không tìm thấy nhiệm vụ.'); return; }
    const now = new Date().toISOString();
    const completedAt = body.status === 'Done' ? (existing.CompletedAt || now) : null;
    db.prepare('UPDATE Tasks SET Status=?, UpdatedAt=?, CompletedAt=? WHERE Id=?').run(body.status, now, completedAt, id);
    sendJson(res, 200, mapTask(db.prepare('SELECT * FROM Tasks WHERE Id=?').get(id))); return;
  }
  if (taskMatch) {
    const id = Number(taskMatch[1]);
    if (req.method === 'GET') {
      const row = db.prepare('SELECT * FROM Tasks WHERE Id=?').get(id);
      if (!row) { sendError(res, 404, 'Không tìm thấy nhiệm vụ.'); return; }
      sendJson(res, 200, mapTask(row)); return;
    }
    if (req.method === 'PUT') { saveTask(res, await readBody(req), id); return; }
    if (req.method === 'DELETE') {
      const result = db.prepare('DELETE FROM Tasks WHERE Id=?').run(id);
      if (!result.changes) { sendError(res, 404, 'Không tìm thấy nhiệm vụ.'); return; }
      res.writeHead(204); res.end(); return;
    }
  }
  sendError(res, 404, 'Không tìm thấy API endpoint.');
}

function serveStatic(req, res, url) {
  const requested = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.resolve(PUBLIC_DIR, `.${requested}`);
  if (!filePath.startsWith(`${PUBLIC_DIR}${path.sep}`) && filePath !== path.join(PUBLIC_DIR, 'index.html')) {
    sendError(res, 403, 'Đường dẫn không hợp lệ.'); return;
  }
  fs.readFile(filePath, (error, contents) => {
    if (error) {
      if (path.extname(requested)) { sendError(res, 404, 'Không tìm thấy tệp.'); return; }
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackError, html) => {
        if (fallbackError) { sendError(res, 500, 'Không tìm thấy giao diện website.'); return; }
        res.writeHead(200, { 'Content-Type': mimeTypes['.html'] }); res.end(html);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(contents);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      const origin = req.headers.origin;
      const requestOrigin = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host || 'localhost'}`;
      if (origin && origin !== requestOrigin && !ALLOWED_ORIGINS.includes(origin)) {
        sendError(res, 403, 'Origin này chưa được cho phép. Cấu hình ALLOWED_ORIGINS cho domain frontend.');
        return;
      }
      if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      }
      if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
      await handleApi(req, res, url);
    }
    else if (req.method === 'GET' || req.method === 'HEAD') serveStatic(req, res, url);
    else sendError(res, 405, 'Phương thức không được hỗ trợ.');
  } catch (error) {
    console.error(error);
    if (!res.headersSent) sendError(res, error.status || 500, error.status ? error.message : 'Đã xảy ra lỗi máy chủ.');
    else res.end();
  }
});

server.listen(PORT, HOST, () => console.log(`MARIO TODO QUEST đang chạy tại http://127.0.0.1:${PORT}`));
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => { server.close(() => { db.close(); process.exit(0); }); });
}
