# MARIO TODO QUEST

Ứng dụng quản lý công việc cá nhân bằng tiếng Việt, với giao diện pixel game vui nhộn. Frontend HTML/CSS/JavaScript gọi API Node.js; API lưu dữ liệu thật trong SQLite.

## Công nghệ và cấu trúc

- Frontend: HTML5, CSS3, Vanilla JavaScript ES modules, Fetch API, Chart.js CDN.
- Backend: Node.js **v26.13.1** (đúng phiên bản dự án đang dùng), HTTP server tích hợp.
- Database: SQLite qua `node:sqlite`; không cần cài npm package ngoài.
- Frontend và backend cùng origin khi chạy local.

```text
mario-todo-quest/
├── frontend/                     # HTML, CSS, JavaScript; deploy GitHub Pages
│   ├── index.html
│   ├── css/styles.css
│   └── js/{config,api,app,tasks,statistics}.js
├── backend/node-api/
│   ├── package.json
│   ├── server.js
│   └── Data/todo.db              # tạo khi chạy; không commit
├── .github/workflows/pages.yml   # tự publish frontend
└── README.md
```

## Chạy local

Node.js v26.13.1 đã được cài trong môi trường phát triển. Không cần tải lại Node và cũng không cần `npm install`:

```powershell
cd backend/node-api
npm start
```

Mở <http://127.0.0.1:3000>. Chạy chế độ tự restart trong lúc sửa backend bằng `npm run dev`. Đổi cổng bằng biến `PORT`, ví dụ `$env:PORT=5050; npm start`.

SQLite được tạo tại `backend/node-api/Data/todo.db`. Database và seed 14 nhiệm vụ được giữ khi khởi động lại. Mở file bằng DB Browser for SQLite để xem bảng `Tasks`.

## Chức năng

- Dashboard hôm nay theo ngày local của trình duyệt; trang danh sách tất cả nhiệm vụ.
- Tìm kiếm, lọc trạng thái/ưu tiên, sắp xếp; tạo, sửa, xóa và đổi trạng thái qua API.
- Coins bằng 10 lần số nhiệm vụ đang Done.
- Thống kê thật từ SQLite và biểu đồ trạng thái, 7 ngày, độ ưu tiên.
- Responsive, focus bàn phím, `prefers-reduced-motion`, thông báo và validation.

## Đưa source lên GitHub

Tạo repository rỗng trên GitHub, rồi chạy tại thư mục gốc `mario-todo-quest`:

```bash
git init
git add .
git commit -m "Build Mario Todo Quest with Node.js"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

Không commit database `*.db`, sidecar SQLite, secrets, `node_modules/`, `bin/` hoặc `obj/`; các mục này đã có trong `.gitignore`.

## Publish frontend bằng GitHub Pages

Repository đã có workflow `.github/workflows/pages.yml`. Workflow chỉ publish nội dung thư mục `frontend/`; backend và database không được đưa lên Pages.

1. Trên GitHub mở **Settings → Pages** và đặt **Build and deployment → Source** thành **GitHub Actions**.
2. Push code lên nhánh `main`.
3. Mở tab **Actions** và đợi workflow **Publish frontend to GitHub Pages** thành công.
4. URL Pages sẽ hiện trong workflow và mục **Settings → Pages**. Với repository thường, URL có dạng `https://<username>.github.io/<repository>/`.

GitHub Pages chỉ host file tĩnh; nó không chạy Node.js và không cung cấp SQLite. Muốn các nút CRUD/thống kê hoạt động trên Pages, cần host `backend/node-api` riêng trên một dịch vụ Node.js có **persistent disk** cho SQLite, sau đó:

1. Cấu hình backend host để chạy `npm start`, truyền biến môi trường `ALLOWED_ORIGINS=https://<username>.github.io` và đặt `DATA_DIR` thành thư mục persistent disk. Nếu dùng domain riêng cho Pages, cho phép origin đó.
2. Lấy URL public của API backend.
3. Trong GitHub mở **Settings → Secrets and variables → Actions → Variables**, tạo variable `API_BASE_URL` với giá trị URL API, ví dụ `https://my-mario-api.example.com` (không thêm dấu `/` cuối).
4. Push commit mới lên `main` hoặc bấm **Run workflow** để Pages build lại. Workflow chèn URL API vào file cấu hình frontend của artifact.

Khi chạy local, cấu hình API để trống nên website dùng API cùng origin ở `127.0.0.1:3000`. Không cấu hình URL API của production bằng `localhost`; URL đó chỉ truy cập được trên máy cá nhân.

## API

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/tasks?search=&status=&priority=&sortBy=&sortDirection=` | Danh sách, lọc và sắp xếp |
| GET | `/api/tasks/today?today=YYYY-MM-DD` | Nhiệm vụ trong ngày local |
| GET | `/api/tasks/{id}` | Chi tiết |
| POST | `/api/tasks` | Tạo nhiệm vụ |
| PUT | `/api/tasks/{id}` | Sửa nhiệm vụ |
| PATCH | `/api/tasks/{id}/status` | Đổi trạng thái |
| DELETE | `/api/tasks/{id}` | Xóa nhiệm vụ |
| GET | `/api/statistics/summary?date=YYYY-MM-DD` | Tổng quan và quá hạn |
| GET | `/api/statistics/weekly?date=YYYY-MM-DD` | Thống kê 7 ngày |
| GET | `/api/statistics/priorities` | Thống kê độ ưu tiên |

## Screenshot

Chạy website, chụp Dashboard, Tất cả nhiệm vụ, Thống kê và mobile; lưu vào `docs/screenshots/` rồi thêm ảnh ở mục này.

## AI usage

Codex hỗ trợ tạo cấu trúc, source code, giao diện, API và README. Người nộp bài cần tự chạy, xem lại và trình bày các phần đã làm.
