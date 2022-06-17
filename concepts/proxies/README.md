# Proxy trong Thiết kế Hệ thống là gì?

Trong blog này, chúng ta sẽ tìm hiểu về Proxy, một khái niệm cần thiết cho một cuộc phỏng vấn thiết kế hệ thống. Nhiều người trong chúng tôi đã sử dụng các công cụ giúp chúng tôi duy trì sự riêng tư hoặc ẩn danh của mình hoặc giữ an toàn trước những người dùng bên thứ ba nghe trộm trong kết nối của chúng tôi. Bạn có biết nó hoạt động như thế nào và nó hữu ích như thế nào không? Hãy cùng tìm hiểu!

## Proxy là gì?

Proxy là một máy chủ đóng vai trò trung gian giữa máy khách và máy chủ khác. Khi các máy khách này gửi yêu cầu đến các trang web trên Internet, máy chủ proxy sẽ chặn các yêu cầu này, sau đó giao tiếp với máy chủ thay mặt cho các máy khách này, giống như một gobetween cho phép chúng tôi thực hiện điều gì đó trước hoặc sau khi yêu cầu được chuyển đến đích ban đầu.

![](./asset/what-are-proxies.png)

## Máy chủ proxy hoạt động như thế nào?

Một proxy hoạt động thay mặt cho một khách hàng hoặc một nhóm khách hàng. Khi một máy khách đưa ra yêu cầu giao tiếp với máy chủ, nó sẽ đi tới proxy thay vì đi trực tiếp đến máy chủ, sau đó sẽ chuyển tiếp yêu cầu tới máy chủ. Nói cách khác, máy khách thực hiện một yêu cầu có nghĩa là đi tới máy chủ nhưng trước tiên hãy đi tới proxy để thay mặt khách giao tiếp với máy chủ.

![](./asset/how-proxy-work.png)

## Máy chủ Proxy được sử dụng ở đâu?

Máy chủ proxy không chỉ được sử dụng để ẩn danh tính của máy khách khỏi máy chủ, mà thay vào đó, nó có nhiều cách sử dụng khác:
- Máy chủ proxy được sử dụng để quản lý các yêu cầu và phản hồi.
- Nó được sử dụng để lọc, ghi nhật ký và chuyển đổi các yêu cầu bằng cách thêm và bớt các tiêu đề.
- Nếu một số máy khách truy cập vào một tài nguyên cụ thể, máy chủ proxy có thể lưu vào bộ nhớ cache và phản hồi cho tất cả các máy khách mà không cần gửi yêu cầu đến máy chủ nhiều lần.
- Nó cũng được sử dụng như một bộ cân bằng tải giữa các máy chủ.

## Forward Proxy là gì?

Forward proxy, thường được gọi là proxy, là một máy chủ nằm giữa máy khách và máy chủ. Ở đây, thay vì gửi yêu cầu trực tiếp đến máy chủ, các yêu cầu được gửi đến một proxy chuyển tiếp, sau đó sẽ gửi yêu cầu đến máy chủ.

Các proxy chuyển tiếp được sử dụng như một người trung gian thay vì tương tác trực tiếp với các máy chủ vì nhiều lý do như để tránh các hạn chế duyệt web, để truy cập nội dung bị chặn hoặc để bảo vệ danh tính của họ trực tuyến.

![](./asset/forward-proxy.png)

## Reverse Proxy là gì?

Reverse Proxy là một máy chủ proxy nằm giữa một hoặc nhiều máy chủ. Các proxy ngược hoàn toàn trái ngược với proxy chuyển tiếp về mô hình tương tác của chúng. Một proxy chuyển tiếp hoạt động thay mặt cho khách hàng, trong khi một proxy ngược hoạt động thay mặt cho máy chủ.

![](./asset/reverse-proxy.png)

Trong trường hợp này, khi một máy khách gửi một yêu cầu đến máy chủ, yêu cầu thực sự đi đến Reverse Proxy mà máy khách không biết về nó. Máy khách nghĩ rằng nó đang tương tác trực tiếp với máy chủ và đối với máy khách, không có máy chủ nào khác ở đây và nó nghĩ rằng máy chủ mà nó đang tương tác là máy chủ mà nó muốn gửi yêu cầu. Chúng ta hãy lấy một ví dụ:

> “Giả sử, nếu chúng ta nhập https://www.enjoyalgorithm.com trong trình duyệt của mình, trình duyệt của chúng ta sẽ thực hiện truy vấn DNS để lấy địa chỉ IP của https://www.enjoyalgorithm.com. Nếu https://www.enjoyalgorithm.com sử dụng proxy ngược và định cấu hình chính xác, truy vấn DNS sẽ trả về địa chỉ IP của proxy ngược ”.

## Các trường hợp sử dụng của proxy ngược là gì?

Giờ đây, proxy ngược rất tiện lợi khi chúng ta thiết kế một hệ thống phức tạp và nó có thể được sử dụng cho nhiều mục đích, chẳng hạn như:

![](./asset/use-case.png)

- **Bảo mật**: Khi chúng tôi sử dụng proxy ngược, địa chỉ IP máy chủ gốc của trang web sẽ bị tóm tắt khỏi những kẻ tấn công. Vì vậy, để khai thác bất kỳ lỗ hổng nào, các máy khách độc hại không thể truy cập trực tiếp vào chúng. Nhiều máy chủ proxy ngược bao gồm các tính năng giúp bảo vệ máy chủ phụ trợ chống lại các cuộc tấn công từ chối dịch vụ (DDoS) phân tán, chẳng hạn như từ chối lưu lượng truy cập từ các địa chỉ IP cụ thể của máy khách (danh sách đen) hoặc giới hạn số lượng yêu cầu được chấp nhận từ mỗi máy khách.
- **Cân bằng tải**: Một trang web với hàng triệu người dùng truy cập mỗi ngày có thể khó xử lý lượng truy cập khổng lồ như vậy với một máy chủ duy nhất. Thay vào đó, chúng tôi có thể sử dụng nhiều máy chủ và sử dụng proxy ngược như một giải pháp cân bằng tải để phân phối lưu lượng giữa các máy chủ và ngăn bất kỳ máy chủ nào bị quá tải.
- **Bộ nhớ đệm**: Một proxy ngược cũng có thể được sử dụng để lưu các yêu cầu vào bộ đệm, dẫn đến hiệu suất nhanh hơn.

## Nhược điểm của Reverse Proxy

Các proxy ngược không phải lúc nào cũng hữu ích và nó có những hạn chế riêng:
- Thêm proxy ngược vào kiến ​​trúc làm tăng độ phức tạp của hệ thống của chúng tôi.
- Một proxy ngược duy nhất có thể hoạt động như một điểm lỗi duy nhất và việc thêm nhiều proxy ngược sẽ làm tăng độ phức tạp hơn nữa.
- Khi chúng tôi sử dụng các kết nối không được mã hóa với máy chủ proxy, máy chủ có thể sửa đổi các phản hồi mà chúng tôi nhận được, dù tốt hay xấu, theo cả hai cách.
- Ngay cả sau khi sử dụng các kết nối hoặc mạng được mã hóa, dữ liệu hoặc thông tin của chúng tôi có thể bị rò rỉ bằng cách sử dụng kỹ thuật **kết nối được mã hóa TLS và SSL**.

## Reverse Proxy so với Load Balancer

Máy chủ proxy ngược và bộ cân bằng tải là các thành phần trong thiết kế hệ thống máy khách-máy chủ. Trong tương tác giữa máy khách và máy chủ, cả hai đều đóng vai trò trung gian, thực hiện các chức năng nâng cao hiệu quả.

Bộ cân bằng tải phân phối các yêu cầu máy khách đến giữa một nhóm máy chủ, trả lại phản hồi cho máy khách thích hợp từ máy chủ đã chọn trong từng trường hợp. Khi một trang web cần nhiều máy chủ, bộ cân bằng tải thường được triển khai nhất vì khối lượng yêu cầu quá nhiều để xử lý hiệu quả cho một máy chủ duy nhất. Công việc của bộ cân bằng tải là phân phối các yêu cầu theo cách sử dụng tốt nhất khả năng của từng máy chủ, tránh quá tải trên bất kỳ máy chủ nào và dẫn đến phản hồi nhanh nhất có thể của máy khách.

![](./asset/proxy-vs-load-balancer.png)

Một proxy ngược chấp nhận một yêu cầu từ một máy khách hoặc một nhóm máy khách, chuyển tiếp nó đến một máy chủ và trả lại phản hồi của máy khách từ máy chủ. Trong khi việc triển khai bộ cân bằng tải chỉ có ý nghĩa khi bạn có nhiều máy chủ, thậm chí chỉ với một máy chủ web hoặc máy chủ ứng dụng, việc triển khai proxy ngược thường có ý nghĩa.