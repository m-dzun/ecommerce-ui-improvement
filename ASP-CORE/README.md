# MOVIESTAR - ASP.NET CORE MVC

**BÀI TẬP CÁ NHÂN – PHÁT TRIỂN ỨNG DỤNG THƯƠNG MẠI ĐIỆN TỬ**

**Sinh viên:** Hoàng Thị Mỹ Dung  
**MSSV:** 31241026863  
**Trường:** Đại học Kinh tế TP. Hồ Chí Minh (UEH)

## 1. Giới thiệu dự án

MovieStar là website quản lý và đặt mua phim được phát triển bằng **ASP.NET Core MVC (.NET 10)**, kết hợp Entity Framework Core và Microsoft SQL Server.

Dự án được thực hiện nhằm thực hành kiến trúc Model–View–Controller, xây dựng các chức năng quản lý dữ liệu, xác thực người dùng, giỏ hàng, thanh toán và triển khai ứng dụng lên hosting thực tế.

**Website:** https://mydung-001-site1.dtempurl.com

## 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Ngôn ngữ lập trình | C# |
| Framework | ASP.NET Core MVC (.NET 10) |
| Giao diện | Razor Views, HTML, CSS, Bootstrap |
| Truy cập dữ liệu | Entity Framework Core |
| Cơ sở dữ liệu | Microsoft SQL Server |
| Xác thực | ASP.NET Core Identity |
| Quản lý phiên | ASP.NET Core Session |
| Gửi email | Gmail SMTP |
| Công cụ phát triển | Visual Studio Code, .NET SDK |
| Hosting | SmarterASP.NET |
| Quản lý mã nguồn | Git & GitHub |

## 3. Các chức năng chính

### Quản lý tài khoản

- Đăng ký tài khoản người dùng.
- Đăng nhập, đăng xuất.
- Xác nhận tài khoản thông qua ASP.NET Core Identity.

### Quản lý phim và thể loại

- Xem danh sách phim và thông tin chi tiết.
- Thêm, chỉnh sửa và xóa phim.
- Quản lý thể loại phim.
- Upload và hiển thị hình ảnh phim.
- Kiểm tra hợp lệ dữ liệu đầu vào.

### Giỏ hàng và đặt hàng

- Thêm phim vào giỏ hàng.
- Quản lý và xóa sản phẩm khỏi giỏ hàng.
- Nhập thông tin giao hàng.
- Thực hiện Checkout và lưu dữ liệu đơn hàng.
- Gửi email xác nhận đơn hàng thông qua Gmail SMTP.

## 4. Cấu trúc thư mục

```text
ASP-CORE/
├── README.md
├── .gitignore
├── SourceCode/
│   └── 31241026863_HoangThiMyDung/
│       ├── Areas/
│       ├── Controllers/
│       ├── Data/
│       ├── Models/
│       ├── Properties/
│       ├── Validation/
│       ├── Views/
│       ├── wwwroot/
│       ├── Program.cs
│       ├── appsettings.example.json
│       └── 31241026863_HoangThiMyDung.csproj
└── Report/
    ├── BaiTap_CaNhan_ASP_CORE_LMS.docx
    └── images/
```

Các thư mục phụ thuộc vào cấu trúc thực tế của dự án. Thư mục `bin`, `obj`, các bản Publish và file chứa thông tin bí mật không được đưa lên repository.

## 5. Hướng dẫn cài đặt và chạy dự án

### Yêu cầu môi trường

- .NET SDK 10.
- Visual Studio Code hoặc IDE hỗ trợ C#.
- Microsoft SQL Server.
- .NET Entity Framework Core CLI.

### Bước 1. Mở mã nguồn

Mở thư mục:

`ASP-CORE/SourceCode/31241026863_HoangThiMyDung`

### Bước 2. Cấu hình cơ sở dữ liệu

Sao chép `appsettings.example.json` thành `appsettings.json`, sau đó cập nhật `DefaultConnection` bằng thông tin SQL Server của môi trường sử dụng.

Ví dụ:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DATABASE;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;Encrypt=True;TrustServerCertificate=True;"
  }
}
```

Nếu sử dụng chức năng gửi email, cần cấu hình địa chỉ Gmail và App Password phù hợp.

Không commit mật khẩu hoặc chuỗi kết nối chứa thông tin đăng nhập lên GitHub.

### Bước 3. Cài đặt thư viện

Mở Terminal tại thư mục dự án:

```powershell
dotnet restore
```

### Bước 4. Cập nhật cơ sở dữ liệu

```powershell
dotnet ef database update
```

Lệnh sẽ áp dụng các EF Core Migrations vào cơ sở dữ liệu đã cấu hình.

### Bước 5. Khởi động website

```powershell
dotnet run
```

Truy cập địa chỉ localhost được hiển thị trong Terminal để sử dụng ứng dụng.

## 6. Triển khai website

Website được triển khai trên **SmarterASP.NET – Windows Hosting**, sử dụng SQL Server để lưu trữ dữ liệu.

**Địa chỉ truy cập:**

https://mydung-001-site1.dtempurl.com

Lệnh Publish:

```powershell
dotnet publish -c Release -r win-x64 --self-contained false -o ./publish-smarter
```

Sau khi Publish, các file được triển khai lên thư mục ứng dụng của hosting.

## 7. Bảo mật mã nguồn

Repository sử dụng `.gitignore` để loại trừ:

- File cấu hình chứa mật khẩu và thông tin nhạy cảm.
- Thư mục `bin`, `obj`.
- Thư mục `publish` và các bản Publish khác.
- File ZIP triển khai, logs và file tạm.

File `appsettings.example.json` chỉ chứa các giá trị mẫu nhằm hướng dẫn cấu hình.

## 8. Báo cáo và minh chứng

Báo cáo bài thực hành được lưu trong `Report/`, bao gồm quá trình thực hiện và hình ảnh minh chứng:

- Cấu trúc dự án ASP.NET Core MVC.
- Kết nối cơ sở dữ liệu SQL Server.
- Các bảng dữ liệu và Entity Framework Core Migrations.
- Chức năng đăng ký, đăng nhập.
- Quản lý phim và thể loại.
- Upload và hiển thị hình ảnh phim.
- Giỏ hàng, Checkout và xác nhận đơn hàng.
- Triển khai website trên SmarterASP.NET.
- Các khó khăn và phương pháp khắc phục.

## 9. Thông tin thực hiện

**Họ và tên:** Hoàng Thị Mỹ Dung  
**Mã số sinh viên:** 31241026863  
**Môn học:** Phát triển ứng dụng thương mại điện tử  
**Dự án:** MovieStar – ASP.NET Core MVC

---

*Dự án được thực hiện phục vụ mục đích học tập và thực hành phát triển ứng dụng thương mại điện tử.*