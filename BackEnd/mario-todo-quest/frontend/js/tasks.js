import { api } from './api.js';

const statusLabel = { Todo: 'Chưa làm', InProgress: 'Đang thực hiện', Done: 'Đã hoàn thành' };
const priorityLabel = { Low: 'Thấp', Medium: 'Trung bình', High: 'Cao' };
const statusClass = { Todo: 'todo', InProgress: 'progress', Done: 'done' };
let callbacks = {};
let currentTasks = [];
let filterTimer;
let pendingDelete = null;

function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
function dateLabel(task) {
  const today = api.date();
  const label = task.dueDate === today ? 'Hôm nay' : task.dueDate < today ? 'Quá hạn' : new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'short' }).format(new Date(`${task.dueDate}T12:00:00`));
  return `${label}${task.dueTime ? ` · ${task.dueTime.slice(0,5)}` : ''}`;
}
function filters(root) { return { search: root.querySelector('[data-filter="search"]').value.trim(), status: root.querySelector('[data-filter="status"]').value, priority: root.querySelector('[data-filter="priority"]').value, sortBy: root.querySelector('[data-filter="sort"]').value, sortDirection: 'asc' }; }
function makeCard(task) {
  const card = el('article', `task-card ${task.status === 'Done' ? 'is-done' : ''}`);
  card.style.setProperty('--task-color', task.status === 'Done' ? '#43b047' : task.priority === 'High' ? '#e52521' : task.priority === 'Medium' ? '#efb62d' : '#7990b1');
  const check = el('button', `check-button ${task.status === 'Done' ? 'done' : ''}`, task.status === 'Done' ? '✓' : '');
  check.type = 'button'; check.setAttribute('aria-label', task.status === 'Done' ? 'Đánh dấu chưa hoàn thành' : 'Hoàn thành nhiệm vụ');
  check.addEventListener('click', async () => { try { await api.status(task.id, task.status === 'Done' ? 'Todo' : 'Done'); callbacks.toast(task.status === 'Done' ? 'Đã cập nhật trạng thái nhiệm vụ.' : 'QUEST COMPLETED +10 COINS!', 'success'); await callbacks.refresh(); } catch (e) { callbacks.toast(e.message, 'error'); } });
  const main = el('div', 'task-main');
  main.append(el('h3', 'task-title', task.title));
  if (task.description) main.append(el('div', 'task-description', task.description));
  const meta = el('div', 'task-meta');
  meta.append(el('span', `badge status-${statusClass[task.status]}`, statusLabel[task.status]));
  meta.append(el('span', `badge priority-${task.priority.toLowerCase()}`, `◆ ${priorityLabel[task.priority]}`));
  const isOverdue = task.status !== 'Done' && task.dueDate < api.date();
  meta.append(el('span', `badge ${isOverdue ? 'overdue' : ''}`, `📅 ${dateLabel(task)}`));
  main.append(meta);
  const actions = el('div', 'task-actions');
  const edit = el('button', 'icon-button', '✎'); edit.type = 'button'; edit.setAttribute('aria-label', `Sửa ${task.title}`); edit.addEventListener('click', () => callbacks.openEditor(task));
  const del = el('button', 'icon-button', '⌫'); del.type = 'button'; del.setAttribute('aria-label', `Xóa ${task.title}`); del.addEventListener('click', () => askDelete(task));
  actions.append(edit, del); card.append(check, main, actions); return card;
}
function askDelete(task) {
  pendingDelete = task;
  const dialog = document.querySelector('#confirm-dialog'); dialog.showModal();
}
export function setupTasks(handlers) {
  callbacks = handlers;
  const confirm = document.querySelector('#confirm-delete');
  confirm.addEventListener('click', async () => { if (!pendingDelete) return; try { await api.remove(pendingDelete.id); document.querySelector('#confirm-dialog').close(); callbacks.toast('Đã xóa nhiệm vụ.', 'success'); pendingDelete = null; await callbacks.refresh(); } catch (e) { callbacks.toast(e.message, 'error'); } });
  document.querySelector('#confirm-cancel').addEventListener('click', () => document.querySelector('#confirm-dialog').close());
}
export async function renderTaskPage({ today = false, all = false } = {}) {
  const root = document.createElement('div');
  root.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow">${today ? 'WORLD 1-1 · DAILY QUEST' : 'QUEST LOG · ALL WORLDS'}</span><h1>${today ? "READY FOR TODAY'S QUEST?" : 'MỌI NHIỆM VỤ CỦA BẠN'}</h1><p>${today ? 'Từng bước nhỏ sẽ đưa bạn đến chiến thắng!' : 'Theo dõi hành trình và chinh phục từng mục tiêu.'}</p></div><button class="button button-primary hero-action" data-add>＋ THÊM NHIỆM VỤ</button></section>
  <div class="summary-grid" data-summary></div><section class="panel"><div class="panel-heading"><h2>${today ? '🍄 NHIỆM VỤ HÔM NAY' : '🧱 DANH SÁCH NHIỆM VỤ'}</h2><span class="count-tag" data-count>0 nhiệm vụ</span></div><div class="filters"><div class="search-wrap"><span>⌕</span><input data-filter="search" type="search" placeholder="Tìm nhiệm vụ..." aria-label="Tìm nhiệm vụ"></div><select data-filter="status" aria-label="Lọc trạng thái"><option value="">Mọi trạng thái</option><option value="Todo">Chưa làm</option><option value="InProgress">Đang thực hiện</option><option value="Done">Đã hoàn thành</option></select><select data-filter="priority" aria-label="Lọc độ ưu tiên"><option value="">Mọi ưu tiên</option><option value="Low">Thấp</option><option value="Medium">Trung bình</option><option value="High">Cao</option></select><select data-filter="sort" aria-label="Sắp xếp"><option value="dueDate">Theo thời hạn</option><option value="priority">Theo ưu tiên</option><option value="title">Theo tên</option></select></div><div class="task-list" data-list></div></section>`;
  root.querySelector('[data-add]').addEventListener('click', () => callbacks.openEditor());
  const reload = async () => {
    const list = root.querySelector('[data-list]'); list.replaceChildren(el('div', 'empty-state', 'Đang tải nhiệm vụ...'));
    try {
      const rows = await api.tasks(filters(root), today); currentTasks = rows;
      root.querySelector('[data-count]').textContent = `${rows.length} nhiệm vụ`;
      list.replaceChildren();
      if (!rows.length) {
        const empty = el('div', 'empty-state'); empty.append(el('span', 'empty-coin', '🪙'), el('h3', '', 'CHƯA CÓ QUEST NÀO'), el('p', '', 'Thêm nhiệm vụ đầu tiên và bắt đầu hành trình nhé!'));
        const add = el('button', 'button button-primary', '＋ THÊM NHIỆM VỤ'); add.addEventListener('click', () => callbacks.openEditor()); empty.append(add); list.append(empty);
      } else rows.forEach(t => list.append(makeCard(t)));
      const done = rows.filter(t => t.status === 'Done').length;
      root.querySelector('[data-summary]').replaceChildren(...[
        ['Nhiệm vụ', rows.length, '🧱', '#5c94fc'], ['Hoàn thành', done, '⭐', '#43b047'], ['Còn lại', rows.length-done, '🍄', '#ffbb22'], ['Tiến độ', `${rows.length ? Math.round(done*100/rows.length) : 0}%`, '🏁', '#e52521']
      ].map(([label, value, icon, color]) => { const card=el('div','summary-card');card.style.setProperty('--accent',color);card.append(el('div','summary-label',label),el('div','summary-value',String(value)),el('span','summary-icon',icon));return card; }));
      if (today) callbacks.headerStats(rows);
    } catch (e) { list.replaceChildren(el('div', 'empty-state', `Không tải được nhiệm vụ: ${e.message}`)); callbacks.toast(e.message, 'error'); }
  };
  root.querySelectorAll('[data-filter]').forEach(control => control.addEventListener('input', () => { clearTimeout(filterTimer); filterTimer = setTimeout(reload, control.dataset.filter === 'search' ? 250 : 0); }));
  root.querySelectorAll('select').forEach(control => control.addEventListener('change', reload));
  root.refresh = reload; await reload(); return root;
}
