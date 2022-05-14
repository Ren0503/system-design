# Thiết Kế Hệ Thống Dropbox

![](./assets/logo.png)

Thiết kế một hệ thống lưu trữ file tương tự như Dropbox hay Google Drive. Bộ lưu trữ đám mây cho phép người dùng lưu trữ dữ liệu ở các server từ xa. Thông thường, các server này được duy trì bởi dịch vụ đám cung cấp và khả dụng để người dùng sử dụng thông qua Internet. Vè cơ bản, người dùng sẽ trả phí dịch vụ hằng tháng cho các dịch vụ đám mây này.

- Hệ thống tương tự: OneDrive, Google Drive
- Độ phức tạp: Trung bình

## 1. Dịch vụ lưu trữ đám mây là gì?

Dịch vụ lưu trữ đám mây đang trở nên rất phổ biến hiện nay hiểu đơn giản là một bộ lưu trữ tài liệu số và có thể truy cập trên nhiều thiết bị. Sự thay đổi từ một người dùng sẽ tạo ra thay đổi trên nhiều thiết bị với các nền tảng và hệ điều hành khác nhau như smartphone, ipad và có thể truy cập từ nhiều vị trí địa lý khác nhau tại bất cứ thời điểm nào, nó chịu trách nhiệm cho cộng đồng sử dụng lớn của dịch vụ đám mây. Các ưu điểm nổi bật của nó như sau:

- **Độ khả dụng**: các dịch vụ lưu trữ đám mây phải luôn khả dụng dữ liệu ở bất cứ đâu và bất cứ khi nào. Người dùng có thể truy cập vào file của họ từ bất cứ thiết bị nào ở bất cứ đâu hay bất cứ khi nào họ muốn.
- **Độ tin cậy và bền lâu**: một yêu cầu khác là dịch vụ đám mây phải cung cấp độ tin cậy dữ liệu 100% . Dịch vụ phải đảm bảo với người dùng rằng họ sẽ không bao giờ mất dữ liệu bằng cách sao chép dữ liệu trên nhiều server tại các vị trí địa lý khác nhau.
- **Khả năng mở rộng**: Người dùng sẽ không bao giờ lo lắng về việc thiếu không gian lưu trữ. Với dịch vụ đám mây bạn sẽ có bộ lưu trữ vô hạn nếu bạn đủ chi trả.

## 2. Yêu cầu và mục tiêu của hệ thống

Ở đây ta có các yêu cầu nổi bật như sau:

1. Người dùng có thể tải lên hay tải xuống file/ảnh từ bất kỳ thiết bị nào.
2. Người dùng có thể chia sẻ file hay thư mục với các người dùng khác.
3. Dịch vụ hỗ trợ khả năng đồng bộ dữ liệu tự động giữa các thiết bị, vd sau khi cập nhật một file trên một thiết bị, tất cả thiết bị khác cũng phải đồng bộ.
4. Hệ thống nên hỗ trợ lưu trữ file lớn đến một GB.
5. Tiêu chuẩn ACID là bắt buộc. Các thao tác trên file phải luôn đảm bảo ACID (Atomicity, Consistency, Isolation, Durability).
6. Hệ thống nên hỗ trợ chỉnh sửa ngoại tuyến. Người dùng có thể thêm/xoá/sửa file khi ngoại tuyến, và khi kết nối mạng trở lại các thay đổi sẽ được đồng bộ với server và các thiết bị khác.

### Yêu cầu mở rộng

Hệ thống nên hỗ trợ lưu nháp dữ liệu, để người dùng có thể quay về bất cứ phiên bản nào của file.

## 3. Một vài xem xét khi thiết kế 

- Ta sẽ có lượng lớn yêu cầu đọc và ghi.
- Tần suất đọc và ghi sẽ ở mức tương đương nhau.
- Bên trong hệ thống, file sẽ được lưu trữ thành từng phần nhỏ gọi là chunks (khoảng 4MB), điều này đem lại nhiều lợi ích tiêu biểu như các thao tác thất bại chỉ cần thực hiện lại trên một chunk. Ví dụ nếu người dùng tải file lên thất bại, thì chỉ có những chunk thất bại là cần tải lại.
- Ta có thể giảm dung lượng dữ liệu thay đổi bằng cách chỉ cập nhật các chunks thay đổi.
- Bằng cách xoá các chunk trùng lặp, ta có thể tiết kiệm không gian lưu trữ và băng thông.
- Lưu lại một bản copy metadata(tên file, kích cỡ, ngày tạo,...) ở phía người dùng để họ có thể // need to fix
- Với các thay đổi nhỏ, người dùng có thể tải vài chunk thay vì toàn bộ file.

## 4. Ước tính cơ bản

- Giả sử ta có 500 triệu người dùng, và 100 triệu người dùng hằng ngày.
- Giả sử trung bình mỗi người dùng kết nối trên 3 thiết bị

Nếu một người dùng trung bình có 200 file, ta sẽ có tổng cộng 100 tỷ file.
- Giả sử trung bình một file là 100KB, ta sẽ cần 10PB tổng cộng

> 100 tỷ * 100KB => 10PB

Bảng tổng hợp
|||
|-|-|
| Total Users | 500 million |
| Files per user | 200 |
| File size | 100KB |
| Total Files | 100 billion |
| Total Storage | 10PB |

## 5. Thiết kế cấp cao

Người dùng sẽ chỉ định một thư mục cụ thể làm workspace trên thiết bị của họ. Bất kỳ file/thư mục nào nằm trong thư mục này sẽ được tải lên cloud, và bất cứ khi nào có sự thay đổi ở phía local, nó sẽ phản ánh chính xác lên bộ lưu trữ đám mây. Người dùng có thể chị định workspaces giống nhau trên tất cả thiết bị khác để có thể có góc nhìn workspace giống nhau ở bất cứ đâu.

Ở thiết kế cấp cao, ta cần lưu trữ file và thông tin metadata của nó như tên file, kích thước, đường dẫn,... và người chia sẻ file này (nếu có). Thế nên ta cần một vài server để giúp người dùng tải lên/xuống từ bộ lưu trữ đám mây và một vài server khác để có thể dễ dàng cập nhật metadata về file và người dùng. Ta cũng cần một vài cơ chế để thông báo cho tất cả thiết bị khi có thay đổi xảy ra để đồng bộ hoá file.

Như hình bên dưới mô tả, Block server sẽ hoạt động với phía client để tải lên/xuống file từ cloud storage và Metadata server sẽ theo dõi thông tin metadata của file được cập nhật trong cơ sở dữ liệu SQL hoặc NoSQL. Synchronization Service sẽ xử lý việc cập nhật bất kỳ metadata của file nào, như thay đổi tên file, ngày chỉnh sửa,...

![](./assets/high-level-design.png)

## 6. Thiết kế thành phần

Bây giờ ta sẽ đi đến thiết kế các thành phần chủ yếu của hệ thống từng phần một:

### a. Client 

Ứng dụng Client giám sát thư mục workspace trên thiết bị của người dùng và đồng bộ tất cả file/thư mục trong nó với bộ lưu trữ đám mây. Ứng dụng client sẽ làm việc vợi Storage Server để tải lên/xuống, và chỉnh sửa fie tới backend Cloud Storage. Client còn tương tác với Synchronization Service để xử lý bất kỳ cập nhật metadata nào, như thay đổi tên file, kích thước, ngày cập nhật,...

Ở đây ta có vài thao tác thiết yếu như sau:

1. Tải file lên và xuống.
2. Phát hiện thay đổi file từ thư mục workspace.
3. Xử lý xung đột do ngoại tuyến hoặc cập nhật đồng thời.

**Làm thế nào xử lý việc truyền tải file hiệu quả?**

Như đã nói ở trên, ta sẽ tách các file thành từng chunk nhỏ hơn để khi truyền tải, ta chỉ cần truyền tải các chunk có thay đổi chứ không phải là toàn bộ file. Ta chia file thành từng chunk với kích cỡ cố định là 4MB. Ta có thể tính toán để tối ưu hoá kích cỡ của chunk dựa trên:
    1. Thiết bị mà ta sử dụng ở phía cloud để tối ưu hoá không gian sử dụng và các thao tác I/O mỗi giây (IOPS)
    2. Băng thông của mạng
    3. Kích cỡ trung bình của file trong bộ lưu trữ. Trong metadata, ta cũng có thể theo dõi một bảng ghi của từng file mà chunk tạo thành chúng.

**Có nên theo dõi bản sao metadata với client?** Theo dõi một bản sao của metadata ở phía local không chỉ cho phép ta cập nhật ngoại tuyến mà còn giúp ta tiết kiệm quá trình round trip để cập nhật metadata từ xa.

**Làm thế nào để client theo dõi thay đổi từ các client khác một cách hiệu quả?**

Một giải pháp có thể thực hiện là client kiểm tra theo chu kỳ với server nếu chúng có bất kỳ thao đổi nào. Vấn đề với cách tiếp cận này là nếu client thường xuyên kiểm tra server có thay đổi không, nó sẽ rất lãng phí băng thông, vì server sẽ trả về phản hồi trống trong hầu hết thời gian, và điều đó làm server thêm bận rộn. Lấy thông tin theo cách này là không tối ưu.

Một giải pháp khác là có thể sử dụng HTTP Long polling. Với long polling, client yêu cầu thông tin t