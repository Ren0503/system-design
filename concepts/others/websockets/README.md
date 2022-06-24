# Ổ cắm web là gì? - Khái niệm thiết kế hệ thống

Trong khi xây dựng bất kỳ ứng dụng web nào, người ta cần xem xét cơ chế phân phối nào sẽ là tốt nhất. Web đã được xây dựng dựa trên mô hình yêu cầu và phản hồi của HTTP. Tuy nhiên, mô hình như vậy phải đối mặt với vấn đề chi phí của HTTP và do đó, chúng không phù hợp với các ứng dụng có độ trễ thấp.

Trong blog này, chúng tôi tập trung vào Cổng kết nối web, là thành phần quan trọng đằng sau các ứng dụng như trò chơi nhiều người chơi hoặc bất kỳ ứng dụng nào dựa vào truyền dữ liệu thời gian thực. Chúng tôi sẽ cung cấp cho bạn thông tin chi tiết về cách thức hoạt động của ổ cắm web và các tính năng chính của nó.

## Hãy hiểu về Web Socket

Web Socket là một giao thức truyền thông nhẹ hai chiều có thể gửi dữ liệu của máy khách đến máy chủ hoặc từ máy chủ đến máy khách. Nó nhằm cung cấp một kênh giao tiếp song công đầy đủ so với một kết nối TCP đơn lẻ. Sau khi kết nối được thiết lập, sau đó được duy trì tồn tại cho đến khi nó bị máy chủ hoặc máy khách chấm dứt.

Web Sockets được sử dụng nhiều trong hầu hết các ứng dụng thời gian thực như giao dịch, nhiều người chơi và trò chơi trực tuyến để nhận dữ liệu trên một kênh liên lạc theo cách hai chiều.

! [] (./ asset / osi.jpeg)

Web socket và HTTP khác nhau đáng kể, nhưng cả hai giao thức đều phụ thuộc vào TCP ở lớp 4 (lớp truyền tải) trong mô hình OSI và nằm ở lớp 7 (lớp ứng dụng).

Giao thức ổ cắm web giảm thiểu chi phí liên quan đến HTTP bằng cách cho phép giao tiếp giữa máy khách và máy chủ với chi phí thấp hơn, nhằm cung cấp truyền dữ liệu theo thời gian thực qua kênh.

Nó duy trì một kết nối TCP socket duy nhất lâu nay giữa máy khách và máy chủ để cho phép phân phối thông điệp hai chiều một cách hiệu quả, cung cấp kết nối không có độ trễ.

## Web Socket hoạt động như thế nào?

Web Socket là một giao thức song công. Khi kết nối được thiết lập trong kiến ​​trúc máy khách-máy chủ, trao đổi thông báo bắt đầu ở chế độ hai chiều và nó sẽ vẫn tồn tại giữa máy khách và máy chủ cho đến khi một trong hai bên chấm dứt nó.
- Tuy nhiên, để mở một kết nối web socket, người ta cần gọi hàm tạo web socket. Đối với ổ cắm web ** ws **: và ** wss **: lược đồ URL được sử dụng, trong khi đối với HTTP, HTTPS: được sử dụng.
- Sau khi thiết lập kết nối với máy chủ, dữ liệu được gửi đến máy chủ bằng phương thức send () trên đối tượng kết nối. Trước đây nó chỉ hỗ trợ chuỗi, nhưng bây giờ trong thông số kỹ thuật mới nhất, nó có thể gửi cả tin nhắn nhị phân bằng cách sử dụng đối tượng ** Blob ** hoặc ** ArrayBuffer **.
- Tương tự, máy chủ có thể gửi cho chúng tôi tin nhắn bằng cách kích hoạt lệnh gọi lại ** onmessage **. Lệnh gọi lại nhận một đối tượng sự kiện trong khi thuộc tính dữ liệu được sử dụng để truy cập thông báo thực tế.
- Các ổ cắm web cũng có một tính năng bổ sung có tên là ** Phần mở rộng **, giúp gửi các khung hình nén hoặc ghép.

## Các tính năng chính của Web Sockets

** Trao đổi dữ liệu hai hướng **: Các ổ cắm web đóng một vai trò quan trọng trong việc giảm lưu lượng mạng bằng cách truyền dữ liệu theo cả hai hướng đồng thời bằng một kết nối duy nhất.

** Khả năng tương thích HTTP **: Các ổ cắm web tương thích cao với các phiên bản trước đó của kết nối HTTP, cho phép chúng tôi chuyển đổi giữa HTTP và WebSocket.

** Mẫu sự kiện Xuất bản / Đăng ký **: Các ổ cắm web cho phép mô hình truyền dữ liệu hiệu quả cao. Các kênh giao tiếp được thiết lập, cho phép gửi tin nhắn đến và đi từ máy chủ và nhận phản hồi theo hướng sự kiện mà không cần liên tục thăm dò máy chủ.

## Web Socket hữu ích như thế nào?

** Trò chuyện tức thì **: Web Sockets đóng một vai trò quan trọng trong việc nhắn tin thời gian thực. Chúng khá hữu ích trong việc xây dựng các tính năng phức tạp và thời gian thực như tin nhắn được mã hóa, chỉ báo nhập, v.v., cho các dịch vụ trò chuyện.

** Chơi game với nhiều người chơi **: Web Sockets khá hữu ích trong việc đồng bộ hóa trạng thái trò chơi giữa những người chơi và cho phép mạng có độ trễ thấp hoạt động. Chúng cho phép trải nghiệm liền mạch trên các thiết bị và cho phép nhiều tính năng tương tác trong thời gian thực để chơi game trực tuyến và được kết nối.

** Bản đồ trực tuyến **: Dữ liệu vị trí địa lý trực tiếp được sử dụng để xây dựng bản đồ trực tuyến theo thời gian thực. Web Sockets đóng một vai trò quan trọng trong việc định tuyến và điều hướng của bất kỳ tài sản di chuyển nào trên một bản đồ sống động.

** Kết quả trực tiếp **: Web Sockets giúp nâng cao nền tảng và liên tục cập nhật cho người dùng thông tin mới nhất và trạng thái nói dối như các cuộc thăm dò bầu cử và kết quả của họ, cập nhật tỷ số trực tiếp, v.v.

## Sự kết luận

Web Sockets đã thực sự cách mạng hóa việc phát triển web. Sử dụng tính chất trạng thái và hai chiều, chúng có lợi trong các hệ thống yêu cầu cập nhật thời gian thực hoặc luồng dữ liệu liên tục. Tuy nhiên, nếu chúng ta chỉ cần tìm nạp một lần, thì một yêu cầu HTTP đơn giản sẽ được xem xét so với Web Sockets.
