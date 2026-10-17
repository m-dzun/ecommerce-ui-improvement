# AI Usage Log

## 1. Công cụ AI

Tên công cụ: Claude 

## 2. Mục đích sử dụng

Em sử dụng AI để hỗ trợ phân tích giao diện website FAHASA, nhận xét ưu điểm và hạn chế của các chức năng, đề xuất hướng cải tiến bố cục, giải thích các thành phần HTML/CSS và tạo mã nguồn HTML, CSS cho giao diện minh họa.

## 3. Prompt đã sử dụng

Đầu tiên là câu lệnh để phân tích các thành phần của website em muốn:
"Bạn là chuyên gia phân tích nghiệp vụ và thiết kế trải nghiệm người dùng
cho website thương mại điện tử.

Tôi đang khảo sát website: fahasha , link là https://www.fahasa.com/ 
Hãy giúp tôi lập bảng phân tích các khu vực:
1. Trang chủ.
2. Danh mục sản phẩm.
3. Chi tiết sản phẩm.
4. Tìm kiếm.
5. Giỏ hàng.

Với mỗi khu vực, hãy nêu:
- Mục đích của chức năng.
- Thành phần giao diện cần có.
- Điểm thuận tiện đối với khách hàng.
- Một vấn đề có thể phát sinh.
- Một đề xuất cải tiến.

Không khẳng định những tính năng chưa được kiểm chứng.
Phân biệt rõ nhận xét dựa trên quan sát và đề xuất của AI."

Và câu lệnh nhận xét phần câu trả lời của AI:
"chỗ tìm kiếm do bạn không truy cập được nên không thấy, bấm vào thanh tìm kiếm sẽ hiện từ khóa hot và danh mục nổi bật (để đề xuất cho người mua). và nó không có chức năng sửa lỗi chính tả đâu nha, nếu nhập tên tác phẩm thì nó sẽ hiện những tác phẩm có tên tương tự nữa, còn tìm tác giả thì sẽ ra những tác phẩm của tác giả đó, có cả gợi ý khi mới nhập 1 chữ đầu thôi nữa, khá tiện lợi. còn vấn đề thì đúng thật, lúc tìm kiếm sẽ không chia ra theo chủng loại, sau khi bấm nút tìm rồi mới lọc kết quả lại được. 
nếu được cải tiến thì khi tìm sách 1 thể loại thì cũng nên giới thiệu thêm các sách khác cùng thể loại, cùng tác giả. còn phần đánh giá sản phẩm ở đây đúng là đang khá yếu thật, có nhiều cái đã bán được 10k nhưng vẫn chưa có đánh giá nào, khiến người muốn mua không có gì để tham khảo, nên cân nhắc đánh giá thì được tích điểm thêm hay voucher để khuyến khích việc đánh giá. 
về giỏ hàng thì giỏ hàng không hiện số lượng có trong giỏ hàng nếu đang ở trang khác, phải bấm vào để kiểm tra xem khá bất tiện, nên hiện số lượng, hiện đại hơn thì có thể hiện bản xem trước là trong giỏ hàng đã có gì. 
nhưng chỉ được áp dụng 1 gift card trên đơn thôi, không thể cộng dồn vô được. nó có sẵn gợi ý là mua thêm bao nhiêu để được nhận quà rồi nên đó không phải cải tiến,  với chưa ghi là đã tiết kiệm được bao nhiêu thôi, chỉ ghi là giảm bao nhiêu từ voucher nào. có tính năng gói quà khúc chọn thanh toán, khá nổi bật."

Cũng như câu lệnh để tạo HTML và CSS theo đề xuất: 
"Tôi đang thực hiện bài tập phát triển giao diện website thương mại điện tử
bằng HTML5 và CSS3.

Tôi muốn cải tiến khu vực: trưng bày sản phẩm giảm giá 
Đối tượng sử dụng: khách hàng mua sắm trực tuyến tại Việt Nam.

Hãy đề xuất:
1. Bố cục giao diện.
2. Các thành phần HTML cần sử dụng.
3. Cách tổ chức CSS.
4. Cách hiển thị trên máy tính và điện thoại.
5. Những điểm cần kiểm tra về khả năng sử dụng.

Trước tiên, hãy giải thích phương án thiết kế.
Chưa tạo toàn bộ mã nguồn cho đến khi tôi yêu cầu."

## 4. Kết quả AI đề xuất

AI đề xuất thiết kế khu vực sản phẩm giảm giá theo hình thức một kệ hàng khuyến mãi, gồm tiêu đề, đồng hồ đếm ngược và danh sách sản phẩm. Trên mỗi thẻ sản phẩm có hình ảnh, tên sách, giá bán, giá gốc, tỷ lệ giảm giá, điểm đánh giá và số lượng đã bán.

Theo đề xuất của AI, việc hiển thị thêm đánh giá và số lượng đã bán có thể giúp khách hàng tham khảo sản phẩm nhanh hơn. AI cũng tạo mã nguồn HTML và CSS ban đầu để xây dựng giao diện minh họa.

## 5. Kiểm tra và điều chỉnh

Sau khi đối chiếu nhận xét của AI với website FAHASA thực tế, em nhận thấy một số nội dung cần điều chỉnh:

- Tìm kiếm: AI chưa quan sát được đầy đủ chức năng này. Thực tế, khi nhập từ khóa, website có gợi ý tên sách tương tự, tác phẩm theo tác giả và gợi ý ngay từ những ký tự đầu tiên. Tuy nhiên, việc lọc theo thể loại chưa thuận tiện ngay tại bước nhập từ khóa. Em đề xuất có thể gợi ý thêm sách cùng thể loại hoặc cùng tác giả để người mua dễ tìm sản phẩm liên quan.
- Đánh giá sản phẩm: Một số sản phẩm có lượng bán cao nhưng chưa có đánh giá. Em đề xuất cân nhắc khuyến khích khách hàng đánh giá bằng điểm thưởng hoặc voucher để tăng lượng thông tin tham khảo cho người mua.
- Giỏ hàng: Website chưa hiển thị rõ số lượng sản phẩm trong giỏ khi khách hàng đang ở trang khác. Em đề xuất hiển thị số lượng ngay trên biểu tượng giỏ hàng hoặc bổ sung phần xem nhanh giỏ hàng. Ngoài ra, website chỉ cho phép sử dụng một gift card trên mỗi đơn hàng và chưa thể hiện rõ tổng số tiền tiết kiệm được từ các ưu đãi.
- Thông tin ưu đãi: Website đã có gợi ý mua thêm để nhận quà và có chức năng gói quà ở bước thanh toán. Vì vậy, em không xem đây là những chức năng cần bổ sung mới.

Đối với giao diện minh họa, em thay đổi hình ảnh sản phẩm và chỉnh sửa đường dẫn ảnh trong file HTML để hiển thị đúng hình ảnh đã chọn.

## 6. Phần em hiểu và có thể giải thích

- HTML - thẻ `<img>` : Dùng để hiển thị hình ảnh sản phẩm. Em đã chỉnh sửa đường dẫn trong thuộc tính `src` để thay đổi ảnh bìa sách.
- HTML - thẻ `<h1>`, `<h2>` và `<p>`: Dùng để hiển thị tiêu đề và nội dung văn bản trên trang.
- CSS - thuộc tính 'color' và 'background-color': Dùng để thay đổi màu chữ và màu nền, giúp giá khuyến mãi và nhãn giảm giá nổi bật hơn.
- CSS - thuộc tính 'font-size' và 'margin': Dùng để điều chỉnh kích thước chữ và khoảng cách giữa các thành phần.
- CSS - '@media' : Cho phép thay đổi cách hiển thị khi kích thước màn hình thay đổi, hỗ trợ giao diện trên điện thoại.

Đây là những thành phần em tập trung tìm hiểu trong quá trình chỉnh sửa giao diện. Em sẽ đối chiếu lại với mã nguồn thực tế để đảm bảo phần giải thích đúng với những gì đã sử dụng.