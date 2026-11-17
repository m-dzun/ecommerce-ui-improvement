# JAVASCRIPT LABS – BÁO CÁO THỰC HÀNH

## 1. Thông tin sinh viên

- **Họ và tên:** Hoàng Thị Mỹ Dung
- **Mã số sinh viên:** 31241026863
- **Lớp:** EE0001
- **Môn học:** Phát triển ứng dụng thương mại điện tử
- **GitHub:** [ecommerce-ui-improvement](https://github.com/m-dzun/ecommerce-ui-improvement)

## 2. Mục tiêu thực hiện

Thông qua ba bài Lab 08, Lab 09 và Lab 10, sinh viên được tìm hiểu và thực hành các kiến thức cơ bản về JavaScript, cách sử dụng DOM để tương tác với các thành phần HTML và cách ứng dụng thư viện jQuery trong phát triển website.

Các mục tiêu chính bao gồm:

- Nắm được cú pháp, cách khai báo biến, sử dụng hàm, mảng và đối tượng trong JavaScript.
- Biết cách truy xuất, thay đổi nội dung và cấu trúc HTML thông qua DOM.
- Biết cách xử lý các sự kiện tương tác của người dùng và kiểm tra dữ liệu biểu mẫu.
- Làm quen với thư viện jQuery để đơn giản hóa việc lựa chọn phần tử, xử lý sự kiện và thao tác DOM.
- Thực hành tạo hiệu ứng cho website và gửi yêu cầu GET để lấy dữ liệu từ máy chủ.

## 3. Cấu trúc thư mục

Dự án được tổ chức thành các thư mục riêng biệt cho từng bài Lab. Mỗi Lab bao gồm trang `index.html` để giới thiệu và liên kết đến các bài thực hành tương ứng.

```text
JavaScript-Labs/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   └── lab-style.css
│
├── images/
│
├── Lab08/
│   ├── index.html
│   ├── exercise.html
│   ├── lab08-walkthrough02.html
│   ├── lab08-walkthrough06.html
│   ├── lab08-walkthrough07.html
│   ├── lab08-walkthrough08.html
│   ├── lab08-walkthrough09.html
│   ├── lab08-walkthrough10.html
│   ├── lab08-walkthrough11.html
│   ├── css/
│   ├── flags/
│   ├── images/
│   └── js/
│
├── Lab09/
│   ├── index.html
│   ├── lab09-walkthrough01.html
│   ├── lab09-walkthrough02.html
│   ├── lab09-walkthrough03.html
│   ├── lab09-walkthrough04.html
│   ├── lab09-walkthrough05.html
│   ├── lab09-walkthrough07.html
│   ├── lab09-walkthrough08.html
│   ├── css/
│   ├── flags/
│   ├── images/
│   └── js/
│
└── Lab10/
    ├── index.html
    ├── lab10-walkthrough01.html
    ├── lab10-walkthrough03.html
    ├── lab10-walkthrough04.html
    ├── lab10-walkthrough05.html
    ├── lab10-walkthrough06.html
    ├── lab10-walkthrough07.html
    ├── lab10-walkthrough08.html
    ├── lab10-walkthrough09.html
    ├── lab10-walkthrough10.html
    ├── css/
    ├── images/
    └── js/
```

**Chức năng các thành phần chính:**

- `index.html`: Trang chủ giới thiệu thông tin sinh viên và cung cấp liên kết đến ba bài Lab.
- `README.md`: Tài liệu mô tả thông tin sinh viên, mục tiêu, cấu trúc và hướng dẫn sử dụng repository.
- `css/`: Chứa các tệp CSS dùng để thiết kế giao diện trang chủ và các trang giới thiệu Lab.
- `images/`: Chứa hình ảnh được sử dụng trong giao diện.
- `Lab08/`, `Lab09/`, `Lab10/`: Lần lượt chứa nội dung thực hành của ba bài Lab.
- `index.html` bên trong từng thư mục Lab: Trang giới thiệu và danh sách các bài tập, cung cấp liên kết để mở từng trang thực hành.
- `js/`: Chứa các tệp JavaScript phục vụ cho từng bài thực hành.
- `css/` và `images/` bên trong từng Lab: Chứa tài nguyên giao diện và hình ảnh được sử dụng trong các bài tập.

## 4. Mô tả nội dung từng Lab

### Lab 08 – JavaScript cơ bản

Bài Lab 08 tập trung giới thiệu những kiến thức nền tảng của ngôn ngữ JavaScript. Nội dung thực hành bao gồm cách nhúng JavaScript vào HTML, sử dụng tệp JavaScript bên ngoài, làm quen với Browser Console, các đối tượng có sẵn, mảng, hàm và đối tượng trong JavaScript.

Thông qua bài Lab này, sinh viên hiểu được cách JavaScript hoạt động và biết cách sử dụng ngôn ngữ này để bổ sung các chức năng cho trang web.

**Nội dung chính:**
- Cách sử dụng JavaScript trong HTML.
- Làm việc với Browser Console.
- Sử dụng các đối tượng có sẵn trong JavaScript.
- Thao tác với mảng, hàm và đối tượng.

**Trang thực hành:** [Lab 08](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab08/)

### Lab 09 – DOM và xử lý sự kiện

Bài Lab 09 tập trung vào việc sử dụng Document Object Model (DOM) để tương tác với các thành phần HTML. Sinh viên thực hành truy xuất phần tử, thay đổi nội dung, thuộc tính, cấu trúc trang web và xử lý các sự kiện phát sinh từ thao tác của người dùng.

Ngoài ra, bài Lab còn giúp sinh viên làm quen với việc sử dụng công cụ Debugger và kiểm tra dữ liệu biểu mẫu.

**Nội dung chính:**
- Truy xuất và thao tác với các phần tử DOM.
- Tạo, thêm và thay đổi các phần tử HTML.
- Xử lý sự kiện trong JavaScript.
- Sử dụng Debugger để kiểm tra và tìm lỗi.
- Kiểm tra dữ liệu nhập từ biểu mẫu.

**Trang thực hành:** [Lab 09](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab09/)

### Lab 10 – Thư viện jQuery

Bài Lab 10 giới thiệu thư viện jQuery và cách sử dụng thư viện này để đơn giản hóa quá trình phát triển website. Sinh viên thực hành sử dụng selector, xử lý sự kiện, thao tác với DOM, tạo hiệu ứng chuyển động và gửi yêu cầu GET để lấy dữ liệu từ máy chủ.

Bài Lab giúp sinh viên hiểu thêm cách ứng dụng jQuery trong việc xây dựng các chức năng tương tác và cập nhật nội dung trên website.

**Nội dung chính:**
- Tích hợp và sử dụng thư viện jQuery.
- Sử dụng các bộ chọn (Selectors).
- Xử lý sự kiện và thao tác DOM.
- Tạo hiệu ứng và chuyển động bằng jQuery.
- Gửi yêu cầu GET và xử lý kết quả thông qua jqXHR.

**Trang thực hành:** [Lab 10](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab10/)

## 5. Đường dẫn GitHub Pages

Website thực hành được triển khai thông qua GitHub Pages tại các địa chỉ sau:

| Nội dung | Đường dẫn |
|---|---|
| Trang chủ JavaScript-Labs | [Truy cập trang chủ](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/) |
| Lab 08 – JavaScript cơ bản | [Truy cập Lab 08](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab08/) |
| Lab 09 – DOM và xử lý sự kiện | [Truy cập Lab 09](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab09/) |
| Lab 10 – jQuery | [Truy cập Lab 10](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/Lab10/) |

**Repository GitHub:** [https://github.com/m-dzun/ecommerce-ui-improvement](https://github.com/m-dzun/ecommerce-ui-improvement)

## 6. Hướng dẫn truy cập các bài thực hành

Giảng viên có thể truy cập và kiểm tra nội dung thực hành theo các bước sau:

1. Truy cập [trang chủ JavaScript-Labs](https://m-dzun.github.io/ecommerce-ui-improvement/JavaScript-Labs/).
2. Xem thông tin sinh viên và phần giới thiệu chung về các bài Lab.
3. Chọn Lab 08, Lab 09 hoặc Lab 10 thông qua các nút liên kết trên trang chủ.
4. Tại trang của từng Lab, xem danh sách các bài tập được sắp xếp theo số thứ tự.
5. Nhấn nút **Xem kết quả** bên dưới mỗi bài tập để mở trang HTML tương ứng và kiểm tra kết quả thực hành.
6. Đối với những bài tập không có trang HTML riêng, nội dung ghi chú sẽ hướng dẫn cách thức thực hiện.

Các trang thực hành được mở trong tab mới để thuận tiện cho việc kiểm tra mà không cần rời khỏi trang danh sách bài tập.

---

**Sinh viên thực hiện:** Hoàng Thị Mỹ Dung  
**Môn học:** Phát triển ứng dụng thương mại điện tử  
**Năm thực hiện:** 2026