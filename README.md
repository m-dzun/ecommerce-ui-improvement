# Buổi 2: HTML & CSS - BÀI TẬP CÁ NHÂN 

**Môn:** Phát triển ứng dụng thương mại điện tử
**Sinh viên:** Hoàng Thị Mỹ Dung – **MSSV:** 31241026863 – **Lớp:** 26C1INF50902701 

## 1. Giới thiệu bài tập

Bài tập cá nhân Buổi 2, tiếp tục phát triển website từ Buổi 1.
Mục tiêu: 
1. Nhận biết và sử dụng các phần tử HTML5 cơ bản.
2. Phân biệt các phần tử có ngữ nghĩa như header, nav, main, section, article và
footer.
3. Sử dụng liên kết, hình ảnh, danh sách và các phần tử văn bản.
4. Tạo và liên kết tệp CSS bên ngoài.
5. Sử dụng CSS selector, màu sắc, font chữ, margin, padding và border.
6. Sử dụng Flexbox để căn chỉnh các thành phần đơn giản.
7. Kiểm tra giao diện, phát hiện lỗi và tự sửa mã nguồn.
8. Sử dụng AI có kiểm soát và cập nhật kết quả lên GitHub.

## 2. Website tham khảo và khu vực đã cải tiến

- **Website tham khảo:** Fahasa - URL: fahasa.com
- **Khu vực chọn làm trọng tâm:** Khối "Sách giảm giá hôm nay" (danh sách sản phẩm và thẻ sản phẩm)
- **Lý do chọn:** Vì khu vực này là thứ rất nhiều khách hàng khi vào trang web lần đầu tiên sẽ để ý nên nó cần nổi bật, thu hút ánh nhìn.
- **Header và footer:** giữ nguyên.

## 3. Kỹ thuật HTML5/CSS3 đã thực hành

(Chỉ tick những mục có trong code của bạn.)

| Nhóm | Đã dùng | Vị trí trong code |
|---|---|---|
| HTML5 ngữ nghĩa: `header`, `main`, `section`, `article`, `figure`, `time` | [ X ] | `index.html` (thẻ `<header>`, `<main>`, `<section class="sale">`, `<article class="card">`, `<figure>`, `<time>`) |
| CSS selector: class, element, descendant | [ X ] |`css/style.css` (bộ chọn class `.card`, element `img`, descendant `.card__body .card__title`) |
| Box Model: `margin`, `padding`, `border`, `border-radius`, `box-sizing` | [ X ] | `css/style.css` (quy tắc `* { box-sizing: border-box; }`, `.card` dùng `padding`, `border-radius`, `border`) |
| Flexbox (`.sale__header`, ...) | [ X ] | `css/style.css` (`.sale__header`, `.card__body`, `.card__price`, `.card__sold`) |
| CSS Grid (`.sale__list`) | [ X ] |`css/style.css` (`.sale__list` khai báo `display: grid; grid-template-columns: ...`) |
| `object-fit`, `aspect-ratio` cho ảnh | [ X ] | `css/style.css` (`.card__image` dùng `aspect-ratio: 1 / 1; object-fit: cover;`) |
| `:hover`, `:focus-visible`, `transition` | [ X ] | `css/style.css` (`.card:hover`, `.card__button:hover`, `:focus-visible`, `transition: transform, box-shadow`) |
| JavaScript: đếm ngược đến 23:59 | [ X ] | `js/script.js` (hoặc thẻ `<script>` xử lý đếm ngược thời gian `00:31:00`) |

## 4. Hướng dẫn chạy website

Website tĩnh, không cần cài đặt.

1. Mở `index.html`đã tạo trước đó bằng trình duyệt Chrome
   
Cấu trúc thư mục:

```
my-bookstore/
├── index.html
├── css/style.css
├── images/            (sanpham-1 … sanpham-5)
└── README.md
```

## 5. Những thay đổi tôi đã thực hiện

| # | Vấn đề ở bản Buổi 1 | Thay đổi | Kết quả |
|---|---|---|---|
| 1 | Thẻ sách chưa có hiệu ứng khi di chuột | [x] Thêm hiệu ứng `:hover` dịch chuyển thẻ theo chiều dọc (`transform: translateY(-4px)`), đổ bóng nhẹ (`box-shadow`) và `:focus-visible` thêm outline nét đứt nổi bật cho accessibility. | Thẻ sản phẩm phản hồi tương tác mượt mà, giúp người dùng nhận biết rõ ràng mục đang chọn. |
| 2 | Không có đếm ngược thời gian ưu đãi | [x] Tích hợp đoạn mã JavaScript xử lý đồng hồ đếm ngược thời gian khuyến mãi thực tế theo định dạng `HH:MM:SS`. | Tạo cảm giác gấp rút (FOMO), kích thích trải nghiệm mua hàng của người dùng. |
| 3 | Mỗi hàng chỉ hiện vài sản phẩm | [x] Sử dụng CSS Grid (`display: grid`) cho `.sale__list` kết hợp `grid-template-columns` linh hoạt theo từng kích thước màn hình. | Hiển thị danh sách sản phẩm dàn đều 5 cột cân đối trên màn hình lớn và cuộn/chia cột tối ưu trên mobile. |
| 4 | Thanh "đã bán" chưa có cảnh báo "Sắp cháy hàng" | [x] Sử dụng thẻ HTML5 `<progress>` kết hợp nhãn hiển thị số lượng "Đã bán X" và tùy chỉnh màu sắc tiến trình nổi bật. | Người dùng dễ dàng theo dõi mức độ "hot" và tiến độ bán ra của từng cuốn sách. |
| 5 | Hạn khuyến mãi viết cứng, đã quá hạn | [x] Chuyển đổi sang sử dụng thẻ `<time>` chuẩn ngữ nghĩa HTML5 kết hợp cập nhật gian tự động qua JS. | Dữ liệu thời gian chính xác, chuẩn SEO và thân thiện với các trình đọc màn hình. |
| 6 | Lỗi hiển thị trên điện thoại ("Xem tất cả", nút "Thêm vào giỏ") | [x] Điều chỉnh `font-size`, xóa `flex: 1 0 100%` ở tiêu đề, thêm `white-space: nowrap` cho nút bấm/link và tinh chỉnh padding trên giao diện 375px (iPhone SE). | Khắc phục hoàn toàn lỗi rớt dòng/vỡ chữ; nút "Xem tất cả" nằm thẳng hàng với đếm ngược, nút "Thêm vào giỏ" nằm gọn trên 1 hàng. |
| 7 | Tối ưu hóa chuẩn Responsive Mobile-First & SEO | [x] Thiết kế theo phương pháp Mobile-First, thêm đầy đủ thuộc tính `alt` mô tả chuẩn cho toàn bộ thẻ `<img>`. | Trang web hiển thị mượt mà trên mọi thiết bị di động, tối ưu khả năng truy cập (Accessibility) và SEO. |

**Chưa thực hiện / hạn chế còn lại:** 
Dự án hiện tại tập trung hoàn thiện giao diện Front-End tĩnh (HTML5/CSS3/JS cơ bản) nên chưa kết nối cơ sở dữ liệu (Database) để lưu trữ giỏ hàng thực tế hay xử lý thanh toán online trực tiếp.

## 6. Công cụ AI đã sử dụng và cách tôi kiểm tra kết quả

- **Công cụ:** Claude  – **Dùng cho:** giải thích HTML/CSS, gợi ý đoạn sửa, tìm lỗi giao diện
- **Phần AI gợi ý và tôi áp dụng:** 
  - Gợi ý sử dụng cấu trúc Flexbox (`justify-content: space-between`, `align-items: center`) cho khối `.sale__header` để phân bổ tiêu đề và đồng hồ đếm ngược cân đối.
  - Gợi ý thêm hiệu ứng `:hover` (`transform: translateY(-4px)` và `box-shadow`) cùng trạng thái `:focus-visible` cho các thẻ sản phẩm `.card` để tăng trải nghiệm tương tác (UX) và tính tiếp cận (Accessibility).
  - Gợi ý áp dụng `white-space: nowrap` cho nút "Thêm vào giỏ" (`.card__button`) để đảm bảo văn bản không bị vỡ dòng trên màn hình hẹp.

- **Phần AI gợi ý nhưng tôi không dùng, hoặc đã sửa lại:** 
  - **AI gợi ý:** Viết thêm khối `@media (max-width: 480px)` riêng biệt để xử lý lỗi rớt dòng của link "Xem tất cả" và nút bấm.
  - **Tôi không dùng / Đã sửa lại:** Vì dự án đang phát triển theo hướng **Mobile-First**, việc tạo thêm media query `max-width` là thừa và không đúng chuẩn kiến trúc CSS ban đầu. Tôi đã chủ động điều chỉnh trực tiếp vào CSS gốc: xóa thuộc tính `flex: 1 0 100%` ở tiêu đề `.sale__title`, thu nhỏ `font-size` hợp lý và thêm `white-space: nowrap` cho nút "Xem tất cả". Cách này giúp code gọn gàng, đúng chuẩn Mobile-First mà vẫn khắc phục triệt để lỗi hiển thị trên iPhone SE (375px).
- **Cách tôi kiểm tra:**
  - [ X ] Mở DevTools (F12), kiểm tra tab Network: `style.css` trả về 200
  - [ X ] Thử chế độ điện thoại ở [320px / 375px / 768px / 1280px]
  - [ X ] Dùng phím Tab để kiểm tra `:focus-visible`
  - [ X ] Kiểm tra tab Console không có lỗi
  - [ X ] Kiểm tra độ tương phản màu bằng [công cụ]

Tôi đã đọc và hiểu mã được dùng trong bài và chịu trách nhiệm về nội dung nộp.

## 7. Đường dẫn

- **Repository:** https://github.com/m-dzun/ecommerce-ui-improvement 
- **Website đã triển khai:** https://m-dzun.github.io/ecommerce-ui-improvement/