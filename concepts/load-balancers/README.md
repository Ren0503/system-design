# Cân bằng tải

![](./assets/load-balancers.svg)

Cân bằng tải là điều cần thiết để xây dựng các ứng dụng hiệu suất cao và có khả năng mở rộng trong thiết kế hệ thống. Nó cũng là một chủ đề phổ biến cho các cuộc phỏng vấn công nghệ thiết kế hệ thống.

## Bộ cân bằng tải là gì?

Bộ cân bằng tải là một phần mềm hoặc một thiết bị phần cứng nằm giữa các máy khách và một tập hợp các máy chủ và cân bằng khối lượng công việc trên các tài nguyên. Nó giúp máy chủ của chúng tôi không bị quá tải và tăng lưu lượng của hệ thống.

## Tại sao chúng ta yêu cầu bộ cân bằng tải?

Chúng tôi sử dụng các dịch vụ web khác nhau trong cuộc sống thực, các dịch vụ này nhanh chóng đáp ứng các yêu cầu của chúng tôi. Nhưng hầu hết chúng ta không biết về quy trình nền và quy mô của hệ thống chịu trách nhiệm cung cấp phản hồi nhanh. Điều này liên quan đến việc phân bổ các yêu cầu trên một số máy chủ khi hàng nghìn người dùng yêu cầu dịch vụ đồng thời.

Mặt khác, tải trên các máy chủ tiếp tục tăng cùng với sự tăng trưởng lưu lượng truy cập và trang web sẽ chậm hơn để phục vụ yêu cầu của người dùng. Để cung cấp phản hồi nhanh chóng và đáng tin cậy, một ý tưởng sẽ là tăng số lượng máy chủ. Nhưng tình huống này mang đến một thách thức mới: làm thế nào để phân phối các yêu cầu trên nhiều máy chủ? Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng ý tưởng về bộ cân bằng tải!

**Hãy hiểu nó từ một góc độ khác!**

Giả sử chúng ta có một số máy khách gửi yêu cầu đến một máy chủ. Khi số lượng yêu cầu tăng lên đáng kể, máy chủ gặp phải tình trạng quá tải, dẫn đến hệ thống bị lỗi.

![](./assets/problems.png)

Sẽ có hai vấn đề quan trọng:
- **Quá tải máy chủ**: Luôn có một giới hạn trên máy chủ để xử lý các yêu cầu. Sau khi tăng số lượng yêu cầu, máy chủ có thể bị quá tải.
- **Điểm lỗi duy nhất**: Nếu một máy chủ gặp sự cố, toàn bộ ứng dụng sẽ không khả dụng cho người dùng trong một khoảng thời gian nhất định. Nó sẽ tạo ra trải nghiệm người dùng không tốt.

**Vậy chúng ta xử lý vấn đề trên như thế nào?**

Chúng tôi có thể cố gắng mở rộng hệ thống của mình. Cách đầu tiên là mở rộng quy mô hệ thống của chúng tôi theo chiều dọc hoặc tăng sức mạnh của máy chủ của chúng tôi. Nhưng, chúng ta chỉ có thể làm rất nhiều điều đó để tăng sức mạnh của một cỗ máy.

Một cách khác là mở rộng quy mô hệ thống theo chiều ngang bằng cách thêm nhiều máy chủ hơn vào hệ thống của chúng tôi. Bây giờ để xử lý yêu cầu, chúng tôi có thể thêm bộ cân bằng tải và phân phối yêu cầu trên nhiều máy chủ. Điều này có thể cho phép các dịch vụ của chúng tôi xử lý một số lượng lớn các yêu cầu bằng cách thêm nhiều máy chủ hơn.

![](./assets/approach.png)

Ngay cả khi một trong các máy chủ ngoại tuyến vì lý do nào đó, dịch vụ sẽ khả dụng. Nó liên tục kiểm tra tình trạng của các tài nguyên phụ trợ và ngăn chặn việc gửi lưu lượng đến các máy chủ không thể thực hiện các yêu cầu.

## Chúng ta thêm bộ cân bằng tải ở đâu?

Chúng tôi có thể thêm bộ cân bằng tải ở nhiều vị trí khác nhau trong hệ thống, đặc biệt là với nhiều tài nguyên như máy chủ, cơ sở dữ liệu hoặc bộ nhớ đệm.
- Giữa máy khách và máy chủ
- Giữa máy chủ và máy chủ ứng dụng
- Giữa ứng dụng và máy chủ bộ nhớ cache
- Giữa bộ nhớ cache và máy chủ cơ sở dữ liệu

## Các loại bộ cân bằng tải là gì?

Có thể có hai loại bộ cân bằng tải: ** bộ cân bằng tải phần mềm ** và ** bộ cân bằng tải phần cứng **. Sự khác biệt chính giữa chúng là chúng ta có thể làm được nhiều việc hơn với bộ cân bằng tải phần mềm. Chúng tôi có nhiều quyền lực hơn để tùy chỉnh và mở rộng quy mô với bộ cân bằng tải phần mềm. Với bộ cân bằng tải phần cứng, chúng tôi bị giới hạn ở phần cứng mà chúng tôi được cung cấp.

### Ưu và nhược điểm của bộ cân bằng tải phần mềm

* Linh hoạt trong việc điều chỉnh theo nhu cầu thay đổi
* Có thể mở rộng quy mô vượt quá dung lượng ban đầu bằng cách thêm nhiều phiên bản phần mềm hơn.
* Chi phí thấp hơn so với mua và bảo trì phần cứng vật lý. Phần mềm có thể chạy trên bất kỳ thiết bị tiêu chuẩn nào, có xu hướng rẻ hơn.
* Nó có thể cho phép cân bằng tải dựa trên đám mây.
* Có thể có một số độ trễ khi mở rộng quy mô vượt quá dung lượng ban đầu trong khi định cấu hình phần mềm cân bằng tải.
* Sẽ có một số chi phí bổ sung cho các nâng cấp liên tục.

### Ví dụ về bộ cân bằng tải phần mềm

- HAProxy: Một bộ cân bằng tải TCP.
- NGINX: Một bộ cân bằng tải HTTP với hỗ trợ kết thúc SSL.
- mod_athena: Trình cân bằng tải HTTP dựa trên Apache.
- Varnish: Trình cân bằng tải dựa trên proxy ngược.
- Cân bằng: Bộ cân bằng tải TCP mã nguồn mở.
- LVS: Máy chủ ảo Linux cung cấp cân bằng tải lớp 4.

### Ưu và nhược điểm của bộ cân bằng tải phần cứng

* Cung cấp thông lượng nhanh do phần mềm chạy trên bộ vi xử lý chuyên dụng.
* Tăng cường bảo mật vì chỉ tổ chức mới có thể truy cập vật lý vào máy chủ.
* Cần thêm nhân lực và chuyên môn để cấu hình và quản lý máy móc.
* Nó không thể mở rộng khi số lượng yêu cầu vượt quá một giới hạn cụ thể.
* Nó đòi hỏi chi phí mua và bảo trì cao hơn.

### Ví dụ về bộ cân bằng tải phần cứng

- F5 bộ cân bằng tải BIG-IP
- Chất xúc tác hệ thống CISCO
- Cân bằng tải Barracuda
- Cân bằng tải Coytepoint
- Citrix NetScaler

## Ưu điểm của cân bằng tải

- Chúng tôi sử dụng bộ cân bằng tải để có trải nghiệm người dùng tốt hơn và dịch vụ không bị gián đoạn bằng cách phân phối các yêu cầu của khách hàng đến một máy chủ có sẵn và đáp ứng. Nói cách khác, nó đảm bảo tính khả dụng và khả năng mở rộng của ứng dụng.
- Nó ngăn chặn tình trạng quá tải của máy chủ và một điểm lỗi duy nhất. Nói cách khác, nó đảm bảo rằng không có máy chủ duy nhất nào chịu quá nhiều yêu cầu làm giảm hiệu suất tổng thể của ứng dụng.
- Nó cũng có thể cung cấp các chức năng như mã hóa, xác thực, v.v. để cung cấp một điểm kiểm soát duy nhất để bảo mật, quản lý và giám sát ứng dụng. Nó có thể bảo vệ hiệu quả khỏi cuộc tấn công DoS.
- Người dùng cuối chỉ cần biết địa chỉ của bộ cân bằng tải, không phải địa chỉ của mọi máy chủ trong cụm. Vì vậy, nó cũng cung cấp một lớp Trừu tượng.
- Chúng tôi có thể tung ra các bản cập nhật phần mềm mà không cần gỡ bỏ toàn bộ dịch vụ bằng cách sử dụng bộ cân bằng tải để lấy ra từng máy chủ tại một thời điểm.
- Nó giảm thiểu thời gian phản hồi của máy chủ và tối đa hóa thông lượng.
- Nó có thể kiểm tra sức khỏe và giám sát khả năng xử lý yêu cầu của các máy chủ.
- Dựa trên số lượng yêu cầu, nó có thể thêm hoặc bớt số lượng máy chủ.

## Các khái niệm quan trọng cần khám phá thêm

- Sự khác biệt giữa Load Balancer và Reverse Proxy là gì?
- Các hạng mục Cân bằng tải khác nhau:
    1. Cân bằng tải lớp 4 (L4)
    2. Cân bằng tải lớp 7 (L7)
    3. Cân bằng tải máy chủ toàn cầu (GSLB)
- Tính năng kiểm tra sức khỏe của bộ cân bằng tải.
- Cân bằng tải DNS so với Cân bằng tải phần cứng
- Bộ cân bằng tải ứng dụng trong việc thiết kế một số hệ thống
- Cân bằng tải đám mây