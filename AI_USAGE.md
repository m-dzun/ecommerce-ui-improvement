# AI Usage Log

## 1. Công cụ AI

Tên công cụ: Claude 

## 2. Mục đích sử dụng

Em sử dụng AI để phân tích các phần còn thiếu trong file HTML cũng như CSS của mình, sau đó nhờ AI gợi ý cách chỉnh sửa để bài được hoàn chỉnh nhất. 
## 3. Prompt đã sử dụng

Các câu lệnh em đã sử dụng cho AI cũng như câu trả lời của AI đều được lưu trong link này: https://claude.ai/share/24627fbd-3c73-4193-a1c8-cf9c39fd3096 

## 4. Kết quả AI đề xuất

AI đề xuất cải tiến giao diện Flash Sale cho sách bằng cách tối ưu hóa trải nghiệm tương tác (UX) và khả năng phản hồi trên di động (Responsive). Cụ thể, AI gợi ý thêm các hiệu ứng :hover (nổi thẻ 3D và đổ bóng) cùng trạng thái :focus-visible để tăng tính tiếp cận. Đối với màn hình điện thoại (iPhone SE 375px), AI đề xuất cấu hình Flexbox cho phần tiêu đề Flash Sale và thêm thuộc tính white-space: nowrap cho các nút bấm để tránh bị tràn chữ.

Bên cạnh đó, AI cũng hỗ trợ tạo mã nguồn CSS chi tiết cho phần tương tác thẻ sản phẩm và bổ sung bảng kiểm thử (Test Table) để đánh giá các tiêu chí hoàn thiện của website.

## 5. Kiểm tra và điều chỉnh

Sau khi đối chiếu mã nguồn và trực tiếp kiểm tra giao diện trên Chrome DevTools ở chế độ di động (iPhone SE 375px), em đã chủ động điều chỉnh lại các đề xuất của AI để phù hợp với kiến trúc thực tế của bài tập:

Về lỗi rớt dòng nút "Xem tất cả": AI ban đầu đề xuất viết thêm một khối @media (max-width: 480px) riêng biệt. Tuy nhiên, do dự án phát triển theo hướng Mobile-First, việc thêm @media max-width là chưa đúng chuẩn. Em đã điều chỉnh trực tiếp ở CSS gốc: bỏ thuộc tính flex: 1 0 100% ở tiêu đề .sale__title, giảm nhẹ font-size và thêm white-space: nowrap cho link "Xem tất cả" để đường link nằm thẳng hàng, gọn gàng sát lề phải cùng với đếm ngược.

Về lỗi tràn chữ nút "Thêm vào giỏ": Nút bấm bị đứt chữ "giỏ" xuống hàng dưới do kích thước chữ ban đầu quá lớn. Em đã điều chỉnh giảm font-size của .card__button xuống 0.8rem - 0.825rem kết hợp với white-space: nowrap để đảm bảo nút luôn vừa vặn trên 1 dòng duy nhất.

Về bố cục danh sách sản phẩm (Grid): Em kiểm tra việc phân chia cột bằng CSS Grid để đảm bảo danh sách vừa hiển thị dạng lưới 5 cột cân đối trên máy tính, vừa hỗ trợ trải nghiệm cuộn mượt mà và không bị sát viền màn hình di động.

## 6. Phần em hiểu và có thể giải thích

HTML - Semantic HTML5 (<article>, <img> với alt, <a>): Dùng <article> để đóng gói độc lập từng thẻ sản phẩm; <img> kèm thuộc tính alt để mô tả hình ảnh chuẩn SEO và hỗ trợ trình đọc màn hình; thẻ <a> dùng tạo liên kết điều hướng khi nhấp vào tên sách hoặc nút "Xem tất cả".

CSS - Box Model (margin, padding, border): Hiểu rõ sự khác biệt giữa padding và margin, giúp căn chỉnh nút bấm và tiêu đề không bị dính sát nhau.

CSS - Bố cục Flexbox & Grid: Giải thích được tác dụng của justify-content và align-items trong .sale__header, cũng như lý do dùng CSS Grid cho danh sách .sale__list để quản lý bố cục 2 chiều.

CSS - Class Selector & Pseudo-classes (:hover, :focus-visible): Dùng Class Selector để áp dụng kiểu dáng đồng bộ cho tất cả các thẻ sản phẩm, kết hợp các lớp giả để tạo hiệu ứng chuyển động (transition) khi di chuột.