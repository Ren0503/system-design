# Khái niệm thiết kế hệ thống: Server Sent Events

Bất cứ khi nào chúng ta xây dựng bất kỳ ứng dụng web xử lý dữ liệu thời gian thực nào, chúng ta cần cân nhắc việc cung cấp dữ liệu cho phía client. Khi tạo một ứng dụng web như vậy, người ta cần phải suy nghĩ về cơ chế phân phối nào sẽ là tốt nhất, đúng không! 

Thông thường ta có 3 khái niệm phổ biến tập trung vào việc truyền dữ liệu giữa client và server.
- Web Sockets
- Server-Sent Events
- Long Polling

Bài viết này sẽ cung cấp cho chúng ta cái nhìn rõ hơn về các hoạt động nội bộ của Server Sent Events và các tính năng cơ bản.

## Server-Sent Events là gì?

Có hai cách tiếp cận chung để phân phối dữ liệu từ server đến client. Giả sử chúng ta đang xử lý một ứng dụng web, trong đó trình duyệt web của chúng ta là Ứng dụng client. Khi trình duyệt yêu cầu dữ liệu từ server, nó được gọi là Client Pull; tương tự, khi server tiếp tục đẩy các bản cập nhật cho trình duyệt, nó được gọi là Server Push. Server-Sent Events là một công nghệ Server Push nhằm mục đích thiết lập một kết nối lâu dài liên tục giữa client và server. Nó cho phép server tự động gửi các bản cập nhật đến client thông qua kết nối HTTP mà không cần đưa ra yêu cầu ban đầu. Chúng mở một kênh định hướng duy nhất giữa client và server để phân phối dữ liệu.

**Server-Sent Events dựa trên API Javascript** có tên EventSource để liên tục cập nhật client. Chúng được thiết kế để nâng cao khả năng phát trực tuyến trên nhiều trình duyệt gốc bằng cách thiết lập kết nối một chiều để gửi các bản cập nhật và luồng dữ liệu liên tục đến client.

## Server-Sent Events hoạt động như thế nào?

Trước khi tìm hiểu chi tiết hoạt động của Server-Sent Events, hãy cùng tìm hiểu kiến ​​thức cơ bản về cách giao tiếp diễn ra qua internet bằng cách tập trung vào các yêu cầu HTTP. HTTP được sử dụng như một cách phổ biến nhất để truyền dữ liệu trong kiến ​​trúc dựa trên client-server để giải quyết vấn đề này, đúng không!

Để giảm thiểu điều này, client cố gắng kết nối lại với nguồn sự kiện bằng cách gửi ID của sự kiện cuối cùng dưới dạng tiêu đề HTTP `Last-Event-ID` đến server thông qua một yêu cầu HTTP mới. Server lắng nghe điều này và một lần nữa bắt đầu gửi các sự kiện đã xảy ra kể từ ID được cung cấp.

**Hãy xem xét kiến ​​trúc bên trong của Server-Sent Events.**

Server-Sent Events là các sự kiện thời gian thực do server phát ra và được nhận bởi trình duyệt. Trong Server-Sent Events, client bắt đầu giao tiếp giữa client và server bằng cách tạo một đối tượng JavaScript EventSource mới. Nó chuyển URL của điểm cuối, dự kiến ​​sẽ trả về một luồng sự kiện. Giao diện EventSource kết nối với server qua HTTP và nhận các sự kiện từ server ở định dạng dòng sự kiện hoặc văn bản. Client gửi một yêu cầu HTTP thông thường đến server và mong đợi một loạt các thông báo sự kiện từ server. Bất cứ khi nào server ghi một sự kiện vào phản hồi HTTP, client sẽ nhận nó và xử lý nó trong một hàm gọi lại người nghe. Kết nối phản hồi HTTP vẫn mở cho đến khi nó có thể được coi là cũ hoặc cho đến khi client đóng nó. Thông báo/sự kiện được truyền trong Server-Sent Events được định dạng theo tiêu chuẩn Server-Sent Events. Mỗi sự kiện bao gồm các cặp khóa/giá trị được phân tách bằng một tập hợp dấu hai chấm, với mỗi cặp được kết thúc bằng một dòng mới, trong khi hai dòng mới kết thúc các sự kiện.

Hãy xem cách client và server được triển khai trong SSE.

### Triển khai Phía Khách hàng

Như đã giải thích trước đó, client tạo một đối tượng EventSource mới để nhận các sự kiện từ server. EventSource lấy một URL mà từ đó các sự kiện phải được vẽ dưới dạng `text/event-stream`.

Client nhận các sự kiện và xử lý chúng trong một hàm gọi lại **listener**. Các hàm gọi lại là các trình xử lý sự kiện, được đăng ký để xử lý các sự kiện. Một phương thức có tên addEventListener của đối tượng EventSource được sử dụng để đăng ký các trình xử lý này. Giả sử trong thông báo sự kiện ban đầu, tồn tại nhiều dòng dữ liệu. Trong trường hợp đó, tất cả những thứ này sẽ được trình duyệt nối lại với nhau để tạo thành một chuỗi và sau đó chỉ các hàm gọi lại được gọi. Tuy nhiên, có một giới hạn đối với các kết nối SSE mà người ta có thể có bất cứ lúc nào. Mỗi trình duyệt chỉ được giới hạn ở sáu kết nối SSE.

### Triển khai Phía server

So với Triển khai phía client, phía server có thể được mã hóa bằng bất kỳ ngôn ngữ nào như Java, C, Python, Go, v.v., trong khi phía client dựa trên JavaScript. server đã nhận được yêu cầu HTTP từ client và phản hồi bằng các thông báo Server-Sent Events hợp lệ. server hướng dẫn client về kiểu nội dung và hướng dẫn client giữ kết nối tồn tại để các sự kiện có thể dễ dàng được gửi qua cùng một kết nối đã thiết lập.

server chỉ có thể chấp nhận các yêu cầu EventSource và đồng thời, nó cần duy trì danh sách tất cả những người dùng được kết nối để tạo ra các sự kiện luồng mới. server cũng phải duy trì lịch sử các tin nhắn để có thể dễ dàng bắt kịp các tin nhắn bị bỏ lỡ. server cũng có thể xóa các kết nối bị bỏ khỏi danh sách của người dùng được kết nối.

### Dừng Luồng Sự kiện

Khi yêu cầu được hoàn thành, cần phải đóng kết nối và dừng luồng sự kiện. Tùy thuộc vào client và server, có hai cách để dừng luồng sự kiện.
- ** Phía client **: client có cơ sở để dừng các sự kiện bằng cách sử dụng phương thức .close () của đối tượng EventSource. Khi phương thức này được gọi, server phát hiện điều này và ngừng gửi các sự kiện đến client bằng cách đóng phản hồi HTTP tương ứng.
- ** Phía server **: server cũng có thể dừng luồng sự kiện bằng cách gửi sự kiện cuối cùng với một ID duy nhất tương ứng với sự kiện “kết thúc luồng”. Hoặc server cũng có thể dừng luồng sự kiện bằng cách đóng kết nối phản hồi HTTP với client.

Do đó, theo cách này, cả client và server đều có tính xác thực là đóng kết nối và dừng các luồng sự kiện.
### Kết nối thất bại

Trong thế giới thực, không có gì có thể hoàn toàn bền bỉ. Trong Sự kiện phía server, kết nối được thiết lập qua HTTP và kết nối có thể bị ngắt do mạng không nhất quán. Điều này có thể ảnh hưởng đến việc chuyển sự kiện và đôi khi thậm chí dẫn đến thông báo sự kiện không đầy đủ. Do đó phải có cơ chế nào đó để giải quyết vấn đề này, đúng không!

Để giảm thiểu điều này, client cố gắng kết nối lại với nguồn sự kiện bằng cách gửi ID của sự kiện cuối cùng dưới dạng tiêu đề HTTP “Last-Event-ID” đến server thông qua một yêu cầu HTTP mới. server lắng nghe điều này và một lần nữa bắt đầu gửi các sự kiện đã xảy ra kể từ ID được cung cấp.

## Ứng dụng của Server-Sent Events

Server-Sent Events rất được sử dụng trong việc xây dựng các ứng dụng web thời gian thực. Chúng cũng được sử dụng để xây dựng dịch vụ thông báo thời gian thực, được sử dụng trong hầu hết các ứng dụng để thông báo cho người dùng hoặc quản trị viên. Những gã khổng lồ công nghệ như Uber cũng dựa vào Server-Sent Events để làm mới các bản cập nhật chuyến đi cho cả tài xế và khách hàng. Chuyến đi của Uber là sự phối hợp di chuyển trong môi trường vật chất giữa những người tham gia như người đi xe và người lái xe. Khi hành trình tiến triển, hai thực thể này phải theo kịp các hệ thống phụ trợ và lẫn nhau.

Hãy xem xét tình huống sau: một người lái xe đã yêu cầu một chuyến đi và một người lái xe có sẵn để cung cấp dịch vụ. Công nghệ đối sánh của Uber tìm thấy một điểm trùng khớp trong phần phụ trợ và gửi đề nghị chuyến đi cho tài xế. Tất cả mọi người (người lái xe, người lái xe và phụ trợ) bây giờ nên biết về ý định của nhau. Cứ sau vài giây, ứng dụng trình điều khiển có thể thăm dò server để xem liệu có ưu đãi mới hay không. Tương tự như vậy, một ứng dụng lái xe cũng có thể thăm dò server vài giây một lần để xem liệu trình điều khiển đã được chỉ định hay chưa.

## Sự kết luận

Server-Sent Events có lợi cho việc cung cấp các bản cập nhật nhanh chóng. So với các giải pháp thay thế khác, không có chi phí nào trong quá trình thực hiện. Server-Sent Events có tính ứng dụng cao trong các hệ thống cần luồng dữ liệu một chiều thời gian thực. SSE được sử dụng nhiều trong Bảng tin của Twitter, Instagram hoặc Facebook. Chúng là công cụ cập nhật biểu đồ giá cổ phiếu và trong hệ thống cập nhật thể thao trực tiếp. Trong blog này, chúng tôi đã cố gắng đề cập đến tất cả các khía cạnh của SSE một cách đơn giản hơn. Hy vọng tất cả các bạn thích nó. Hãy chia sẻ quan điểm của bạn trong phần bình luận bên dưới :)