# Độ trễ của Hệ thống là gì?

Bạn đã bao giờ để ý nước chảy ra từ đường ống như thế nào chưa? Tốc độ của nước ra khỏi đường ống khác nhau, phải không! Đôi khi nước chảy ra rất nhanh, và đôi khi quá chậm. Khái niệm này liên quan đến độ trễ trong hệ thống máy tính.

Độ trễ xác định tốc độ nước trong đường ống có thể được chuyển từ đầu này sang đầu khác hoặc theo thuật ngữ máy tính, nó xác định tốc độ truyền dữ liệu từ máy khách đến máy chủ và quay lại máy khách. Đây là thước đo trực tiếp về hiệu suất, tức là, độ trễ càng thấp, hiệu suất càng tốt.

Blog này sẽ tập trung vào hiểu biết khái niệm về độ trễ, cách nó tác động đến hiệu suất của hệ thống và những biện pháp nào nên được áp dụng để cải thiện độ trễ của hệ thống.

## Ý nghĩa và định nghĩa độ trễ

Độ trễ là khoảng thời gian từ khi bắt đầu yêu cầu ở đầu máy khách đến khi máy chủ gửi kết quả trở lại máy khách, tức là thời gian khứ hồi giữa trình duyệt và máy chủ.

Mục tiêu cuối cùng của chúng tôi là phát triển một hệ thống không có độ trễ, nhưng các nút thắt cổ chai khác nhau ngăn cản việc phát triển các hệ thống như vậy trong thế giới thực. Giảm độ trễ của hệ thống, càng mất ít thời gian để xử lý các yêu cầu của chúng tôi. Bất cứ khi nào một yêu cầu được thực hiện, trình duyệt sẽ gửi một tín hiệu đến máy chủ. Máy chủ xử lý các yêu cầu và lấy thông tin để đưa nó trở lại máy khách.

## Độ trễ hoạt động như thế nào?

Độ trễ không gì khác ngoài thời gian ước tính mà khách hàng phải đợi sau khi bắt đầu yêu cầu để nhận kết quả. Hãy lấy một ví dụ và xem xét cách nó hoạt động.

Giả sử bạn tương tác với một trang web thương mại điện tử, chẳng hạn như Walmart, và bạn thích một thứ gì đó và thêm nó vào giỏ hàng. Bây giờ khi bạn nhấn nút “Thêm vào giỏ hàng”, các sự kiện sau sẽ xảy ra:
- Ngay khi nhấn nút “Thêm vào giỏ hàng”, đồng hồ thời gian chờ bắt đầu và trình duyệt bắt đầu yêu cầu máy chủ.
- Máy chủ ghi nhận yêu cầu và xử lý nó.
- Máy chủ trả lời yêu cầu, yêu cầu đến trình duyệt của bạn và sản phẩm được thêm vào Giỏ hàng của bạn.

Bạn có thể khởi động đồng hồ bấm giờ ở bước đầu tiên và dừng đồng hồ bấm giờ ở bước cuối cùng và sự khác biệt sẽ là độ trễ.

## Nguyên nhân nào gây ra Độ trễ?

Bây giờ, bạn chắc hẳn đã có ý tưởng chính, nhưng bạn có biết độ trễ đến từ đâu không? Độ trễ trong mạng phụ thuộc vào các tham số khác nhau và chúng có ảnh hưởng lớn đến việc xác định giá trị của nó. Một trong những yếu tố chính gây ra độ trễ là các cuộc gọi đi. Trong ví dụ trước về bài tập thêm giỏ hàng, khi bạn nhấp vào nút trên trình duyệt, yêu cầu sẽ chuyển đến một số máy chủ trong phần phụ trợ, máy chủ này lại gọi nhiều dịch vụ nội bộ để tính toán (song song hoặc tuần tự) và sau đó chờ phản hồi hoặc tổng hợp họ. Tất cả điều này làm tăng thêm độ trễ của cuộc gọi. Tuy nhiên, nó chủ yếu được gây ra bởi các yếu tố sau:
- **Phương tiện truyền tải**: Phương tiện truyền dẫn là đường dẫn vật lý giữa điểm đầu và điểm cuối. Độ trễ của hệ thống phụ thuộc vào loại phương tiện được sử dụng để truyền yêu cầu. Các phương tiện truyền dẫn như WAN và Cáp quang được sử dụng rộng rãi, nhưng mỗi phương tiện đều có những hạn chế, ảnh hưởng đến độ trễ.
- **Truyền**: Nó được đề cập đến khoảng thời gian cần thiết để một gói tin truyền từ nguồn này sang nguồn khác. Độ trễ của hệ thống phụ thuộc nhiều vào khoảng cách giữa các nút giao tiếp. Các nút nằm càng xa thì độ trễ càng nhiều.
- **Bộ định tuyến**: Bộ định tuyến tạo thành một thành phần thiết yếu trong giao tiếp và mất một khoảng thời gian để phân tích thông tin tiêu đề của một gói tin. Độ trễ phụ thuộc vào mức độ hiệu quả của bộ định tuyến xử lý yêu cầu. Bước nhảy từ bộ định tuyến đến bộ định tuyến làm tăng độ trễ của hệ thống.
- **Độ trễ của bộ nhớ**: Độ trễ của hệ thống cũng tùy thuộc vào loại hệ thống lưu trữ được sử dụng, vì có thể mất một khoảng thời gian để xử lý và trả lại dữ liệu. Do đó việc truy cập dữ liệu được lưu trữ có thể làm tăng độ trễ của hệ thống.

## Cách đo Độ trễ?

Có nhiều phương pháp được sử dụng để định lượng độ trễ. Chúng ta có thể đo lường nó theo nhiều cách khác nhau;
ba phương pháp phổ biến nhất là:
- **Ping**: Ping là tiện ích phổ biến nhất được sử dụng để đo độ trễ. Nó gửi các gói đến một địa chỉ và xem phản hồi đang diễn ra nhanh như thế nào. Ping đo khoảng thời gian để dữ liệu di chuyển từ nguồn đến đích và quay trở lại nguồn. Ping nhanh hơn tương ứng với kết nối nhanh hơn.
- **Traceroute**: Traceroute là một tiện ích khác được sử dụng để kiểm tra độ trễ. Nó cũng sử dụng các gói để tính toán thời gian thực hiện cho mỗi bước nhảy khi được chuyển đến đích.
- **MTR**: MTR là sự kết hợp của cả ping và Traceroute. MTR đưa ra một báo cáo liệt kê cách mỗi bước trong mạng được yêu cầu để một gói truyền từ đầu này sang đầu kia. Báo cáo thường bao gồm các chi tiết khác nhau như phần trăm mất mát, độ trễ trung bình, v.v.

## Tối ưu hóa độ trễ

Độ trễ hạn chế hoạt động của hệ thống; do đó cần phải tối ưu hóa nó. Chúng ta có thể giảm nó bằng cách áp dụng các biện pháp sau:
- **HTTP/2**: Chúng tôi có thể giảm nó bằng cách sử dụng HTTP / 2. Nó cho phép truyền song song và giảm thiểu các chuyến đi vòng từ người gửi đến người nhận, có hiệu quả cao trong việc giảm độ trễ.
- **Ít yêu cầu HTTP bên ngoài hơn**: Độ trễ tăng do các dịch vụ của bên thứ ba. Bằng cách giảm số lượng yêu cầu HTTP bên ngoài, độ trễ của hệ thống được tối ưu hóa do các dịch vụ của bên thứ ba ảnh hưởng đến cả tốc độ và chất lượng của ứng dụng.
- **CDN**: CDN được chứng minh là một lợi ích trong việc giảm độ trễ. CDN lưu trữ tài nguyên ở nhiều vị trí trên toàn thế giới và giảm thời gian di chuyển của yêu cầu và phản hồi. Do đó, thay vì quay trở lại máy chủ gốc ngay bây giờ, yêu cầu có thể được tìm nạp bằng cách sử dụng các tài nguyên được lưu trong bộ nhớ cache gần máy khách hơn.
- **Bộ đệm trình duyệt**: Bộ đệm ẩn trình duyệt cũng có thể giúp giảm độ trễ bằng cách lưu vào bộ đệm các tài nguyên cụ thể cục bộ để giảm số lượng yêu cầu được gửi đến máy chủ.
- **Disk I/O**: Mục tiêu là tối ưu hóa các thuật toán để giảm thiểu tác động của disk I / O. Do đó, thay vì thường xuyên ghi vào đĩa, hãy sử dụng bộ nhớ đệm ghi qua hoặc cơ sở dữ liệu trong bộ nhớ hoặc kết hợp ghi nếu có thể hoặc sử dụng các hệ thống lưu trữ nhanh, chẳng hạn như SSD.

Là một nhà phát triển, độ trễ cũng có thể được tối ưu hóa bằng cách đưa ra các lựa chọn thông minh hơn liên quan đến lớp lưu trữ, lập mô hình dữ liệu, fanout cuộc gọi đi, v.v. Dưới đây là một số cách để tối ưu hóa độ trễ ở cấp ứng dụng:
    - Các thuật toán không hiệu quả là nguồn gốc của độ trễ rõ ràng nhất trong mã. Cần tránh các vòng lặp không cần thiết hoặc các phép toán đắt tiền lồng vào nhau.
    - Sử dụng các mẫu thiết kế tránh khóa vì khóa đa luồng gây ra độ trễ.
    - Sử dụng mô hình lập trình không đồng bộ để sử dụng tài nguyên phần cứng tốt hơn vì các hoạt động chặn gây ra thời gian chờ lâu.
    - Giới hạn độ sâu hàng đợi không giới hạn và cung cấp áp lực ngược thường dẫn đến thời gian chờ mã ít hơn, dẫn đến độ trễ có thể dự đoán được nhiều hơn.

## Kết luận

Nó là một khái niệm quan trọng gắn liền với thiết kế của mọi hệ thống. Người ta không bao giờ có thể tạo ra một hệ thống hoàn toàn không có độ trễ, nhưng người ta có thể dễ dàng tối ưu hóa nó. Với phần cứng hiện đại và những cỗ máy tính toán hiệu quả nặng, độ trễ không còn là điểm nghẽn của hệ thống.