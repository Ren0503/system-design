# Long polling trong thiết kế hệ thống

Bất kỳ khi nào chúng ta xây dựng bất kỳ ứng dụng Web xử lý dữ liệu thời gian thực nào, chúng ta cần xem xét việc cung cấp dữ liệu cho khách hàng. Khi xây dựng một loại ứng dụng Web như vậy, người ta cần xem xét cơ chế phân phối tốt nhất, đúng không! Trong bài viết này, chúng ta sẽ tập trung vào tính năng Long polling và sẽ cung cấp cho bạn cái nhìn sâu về các hoạt động nội bộ và các tính năng cơ bản của nó.

## Long Polling là gì?

Trước tiên, chúng ta hãy xem polling là gì và mở rộng của nó như thế nào đối với long polling. Polling là một kỹ thuật cho phép server đẩy thông tin đến client. Long polling là một phiên bản của polling truyền thống cho phép server gửi dữ liệu đến client bất cứ khi nào có sẵn. Nó liên quan đến việc phía client yêu cầu thông tin từ server giống như cách mà polling tiêu chuẩn thực hiện, nhưng với cảnh báo rằng server có thể không phản hồi ngay lập tức. Câu trả lời đầy đủ sẽ được gửi đến client sau khi dữ liệu có thể truy cập được.

Long polling làm giảm số lượng yêu cầu HTTP cần thiết để gửi cùng một lượng thông tin cho client. Tuy nhiên, server phải “giữ” các yêu cầu của client chưa được thực hiện và xử lý tình huống trong đó nó nhận được thông tin mới để cung cấp, nhưng client vẫn chưa đưa ra yêu cầu mới. Long polling có lợi thế là một phần của giao thức HTTP, có nghĩa là nó được chấp nhận rộng rãi và tạo ra ít băng thông hơn so với short polling vì nó yêu cầu ít truy vấn hơn. Nhìn chung, đây là một phương pháp đáng tin cậy để liên tục cập nhật thông tin mới cho client một cách đơn giản.

Sau đây là vòng đời cơ bản của một ứng dụng sử dụng HTTP Long-Polling:
1. Client gửi một yêu cầu HTTP và sau đó chờ phản hồi.
2. Khi có bản cập nhật, server cung cấp cho client một phản hồi hoàn chỉnh.
3. Sau khi nhận được phản hồi, client thường gửi một yêu cầu long-poll mới, ngay lập tức hoặc sau khi tạm dừng, để cho phép một khoảng thời gian chờ thích hợp.
4. Thời gian chờ được đặt cho mỗi yêu cầu long-poll. Sau khi kết nối bị mất do hết thời gian chờ, client phải thường xuyên kết nối lại.

## Long polling hoạt động như thế nào?

Long polling là một phiên bản hiệu quả hơn của phương pháp polling cơ bản. Các yêu cầu lặp đi lặp lại đến server sẽ lãng phí tài nguyên vì mỗi kết nối mới đến yêu cầu thiết lập một kết nối mới, phân tích tiêu đề HTTP, truy vấn dữ liệu mới, tạo và phân phối phản hồi. Sau đó, kết nối phải được kết thúc và mọi tài nguyên phải được dọn dẹp. Long polling là một chiến lược trong đó server chọn để giữ kết nối của client mở trong thời gian khả thi, chỉ phản hồi khi dữ liệu có sẵn hoặc đạt đến ngưỡng thời gian chờ, thay vì phải lặp lại quy trình cho từng client cho đến khi có dữ liệu mới.

Trong long polling, phần lớn côn việc được thực hiện trên server. Chỉ một yêu cầu đến server là cần được quản lý ở phía client, khi client nhận được phản hồi. Họ có thể đưa ra yêu cầu mới, lặp lại quy trình nếu cần. Sự khác biệt giữa polling cơ bản và polling thiết yếu từ góc nhìn của client là nếu client thực hiện polling cơ bản, nó có thể cố ý để lại một khoảng thời gian nhỏ giữa mỗi yêu cầu để giảmm tải server. Nó có thể phản hồi với thời gian chờ khác với server không hỗ trợ long polling.

Ví dụ: với long polling, client có thể được cấu hình để cho phép khoảng thời gian chờ lâu hơn khi lắng nghe phản hồi, điều này thường được tránh vì khoảng thời gian chờ được sử dụng để xác định các vấn đề giao tiếp với server.

Ngoài những cân nhắc này, client không cần phải thực hiện nhiều điều khác mà chưa được đề cập trong polling ​​cơ bản. Mặt khác, server phải xử lý trạng thái của một số kết nối chưa được giải quyết. Khi một số server và bộ cân bằng tải được sử dụng, có thể cần tạo các giải pháp để duy trì trạng thái phiên. Nó cũng phải xử lý khéo léo các khó khăn về thời gian chờ kết nối, thường gặp hơn nhiều đối với các giao thức purpose-built.

## Những lưu ý khi sử dụng tính năng long polling

Nếu polling ​​chỉ là một ứng biến được áp dụng cho một cơ chế phản hồi yêu cầu cơ bản, thì nó sẽ đi kèm với một mức độ phức tạp bổ sung trong việc triển khai. Do đó, có nhiều mối quan tâm khác nhau mà bạn cần giải quyết khi sử dụng HTTP long polling để xây dựng tính tương tác theo thời gian thực trong ứng dụng của bạn, cả phát triển và mở rộng.
- Khi việc sử dụng ngày càng tăng, bạn sẽ sắp xếp chương trình backend thời gian thực của mình như thế nào?
- Long polling có tự động thiết lập lại kết nối khi thiết bị di động chuyển đổi nhanh chóng giữa WiFi và mạng di động hoặc mất kết nối và địa chỉ IP thay đổi không?
- Với long polling, bạn có thể quản lý hàng đợi tin nhắn và bắt kịp các tin nhắn bị bỏ lỡ không?
- Long polling có cung cấp hỗ trợ cân bằng tải hoặc chuyển đổi dự phòng trên nhiều server không?

## Các thách thức với long polling

1. Sắp xếp và phân phối tin nhắn.
2. Khi kết nối mạng bị mất và client không khả dụng để nhận được nó.
3. Nếu client cùng lúc thiết lập kết nối đến nhiều server, thứ tự tin nhắn có thể không được đảm bảo.
4. Hiệu suất và mở rộng.
5. Thiết bị hỗ trợ và dự trữ

## Kết luận

Long polling giúp cung cấp thông tin cập nhật thường xuyên. Nó liên quan đến việc client yêu cầu thông tin từ server theo như cách mà việc polling thông thường thực hiện nhưng hiểu rằng server có thể không phản hồi ngay lập tức. Thay vì trả về một phản hồi trống nếu server không có thông tin mới, server giữ yêu cầu mở và đợi thông tin phản hồi có sẵn. Server cung cấp phản hồi HTTP/S cho client ngay khi nhận được thông tin mới, hoàn thành yêu cầu HTTP/S đang mở. Client thường đưa ra một yêu cầu khác sau khi nhận được phản hồi từ server.

Bằng cách này, độ trễ phản hồi thông thường liên quan đến ứng dụng do client polling sẽ bị loại bỏ, vì thế nó được sử dụng nhiều trong các ứng dụng khác nhau.