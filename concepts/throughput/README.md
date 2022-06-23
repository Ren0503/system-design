# Thông lượng: Khái niệm Thiết kế Hệ thống

[Version English](./README_EN.md)

![](./assets/throughput.svg)

Chắc hẳn bạn đã thấy nước chảy ra từ đường ống như thế nào rồi đúng không! Lưu lượng của nước có thể khác nhau, nghĩa là đôi khi lưu lượng có thể ít hơn và đôi khi lưu lượng lớn, nhưng có một giới hạn trên đối với lưu lượng tối đa có thể đi ra từ một đường ống và đó là công suất của nó. Thông lượng là một khái niệm cơ bản trong Khoa học Máy tính và mạng truyền thông, tương tự như lưu lượng nước trong đường ống. Trong bài viết này, chúng ta sẽ nói về thông lượng và tầm quan trọng của nó trong việc thiết kế bất kỳ hệ thống máy tính nào.

## Ý nghĩa thông lượng trong Thiết kế Hệ thống

Thông lượng được định nghĩa là tổng số mục được xử lý trên một đơn vị thời gian, hay có thể nói thông lượng là tốc độ sản xuất một thứ gì đó. Nó thường được biểu thị bằng số lượng bit được truyền mỗi giây hoặc số lượng hoạt động HTTP mỗi ngày. Thông lượng của hệ thống thường thu được bằng cách cộng tất cả các mục và chia tổng cho khoảng mẫu. Đây là một cách tiêu chuẩn để có được thông lượng, nhưng nó bị bỏ qua các biến thể tốc độ xử lý. Hãy lấy một ví dụ để hiểu rõ hơn về cách đạt được thông lượng.

Giả sử một dây chuyền lắp ráp đang sản xuất ô tô. Nếu nhà máy có thể sản xuất khoảng 100 xe ô tô mỗi ngày. Như vậy thông lượng của tuyến là **~ 100 xe/ngày**.

## Quan niệm sai với độ trễ

Độ trễ được định nghĩa là khoảng thời gian từ khi đưa ra yêu cầu đến khi bắt đầu thấy kết quả. Nó được đo bằng đơn vị thời gian. Độ trễ luôn bị hiểu nhầm với thông lượng và người ta cho rằng **Hệ thống thông lượng cao nên có độ trễ thấp**. Tuy nhiên, điều này có thể không phải lúc nào cũng đúng. Hãy xem xét việc xử lý dữ liệu liên quan đến các đĩa, có xu hướng có thông lượng lớn nhưng không cung cấp độ trễ thấp.

Tương tự, trong các kết nối được nối mạng, độ trễ tăng theo thông lượng. Với sự gia tăng thông lượng, ngày càng nhiều gói tin sẽ có trên đường truyền và góp phần làm tăng độ trễ. Cũng có thể có các hệ thống có **Thông lượng thấp và độ trễ cũng thấp**. Do đó, sự kết hợp giữa Độ trễ và Thông lượng được lựa chọn tốt nhất bằng cách xem xét hệ thống và các yêu cầu nghiệp vụ.

### Các yếu tố ảnh hưởng đến thông lượng

Thông lượng của hệ thống phụ thuộc vào các yếu tố khác nhau. Nó phụ thuộc vào các giới hạn tương tự cơ bản, khả năng xử lý của hệ thống, khả năng truy cập của dịch vụ và các thành phần phần cứng khác nhau. Nó cũng bị ảnh hưởng bởi lưu lượng mạng, các thay đổi về nhiễu và lỗi truyền dẫn. Thông lượng cũng phụ thuộc vào chi phí giao thức vì những chi phí này ảnh hưởng đến tốc độ truyền dữ liệu và hạn chế hệ thống đạt được thông lượng mong muốn tối đa.

### Hạn chế tương tự

Phương tiện vật lý tương tự có ảnh hưởng rõ rệt đến thông lượng tối đa có thể đạt được của hệ thống. Trong giao tiếp được nối mạng, các giới hạn tương tự của phương tiện ảnh hưởng đến thông lượng bằng cách tuân theo giới hạn trên về lượng thông tin có thể chia sẻ.

### Giới hạn phần cứng

Có một giới hạn trên cho mọi hệ thống máy tính và tiến trình. Điều này giới hạn thông lượng của hệ thống vì các hệ thống tính toán chỉ có một số khả năng xử lý hữu hạn. Khi một truy vấn lớn và phức tạp đòi hỏi phải tính toán nhiều, nó sẽ gây ra ảnh hưởng lớn đến tốc độ xử lý và thông lượng của hệ thống.

### Khả năng tiếp cận

Khả năng tiếp cận dịch vụ cũng ảnh hưởng đến thông lượng của hệ thống. Khi nhiều người dùng chia sẻ đồng thời một hệ thống giao tiếp, điều đó có thể liên quan đến việc chia sẻ tài nguyên và ảnh hưởng đến thông lượng của hệ thống. Hơn nữa, khả năng tiếp cận với nhiều khách hàng cũng làm tăng lưu lượng truy cập trong mạng, đây cũng là một yếu tố quan trọng làm giảm thông lượng.

## Kết luận

Thông lượng là một khái niệm rất liên quan đến thiết kế của mọi hệ thống. Nó là thước đo lượng dữ liệu được truyền qua một kênh. Các kiến ​​trúc sư luôn tập trung vào việc tăng thông lượng càng nhiều càng tốt để tăng công suất và hiệu suất của hệ thống. Trong bài viết này, chúng tôi đã cố gắng đề cập đến tất cả các khía cạnh khái niệm của Thông lượng.