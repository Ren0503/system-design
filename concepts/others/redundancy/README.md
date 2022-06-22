# Bộ nhớ và Dự phòng

Thiết bị lưu trữ là một phần cứng được sử dụng chủ yếu để lưu trữ dữ liệu. Lưu trữ là một cơ chế cho phép, tạm thời hoặc vĩnh viễn, máy tính bảo quản dữ liệu. Thành phần cơ bản của hầu hết các thiết bị kỹ thuật số là các thiết bị lưu trữ như ổ đĩa flash và ổ cứng. Chúng cho phép người dùng lưu trữ tất cả các loại thông tin, chẳng hạn như video, tài liệu, ảnh và dữ liệu thô.

** Tính bền bỉ **: Tính bền bỉ đề cập đến các đặc điểm của thực thể và quá trình tiếp tục tồn tại ngay cả sau khi quá trình tạo ra nó chấm dứt hoặc bị tắt bởi máy tính mà nó đang hoạt động. Khi một đối tượng hoặc trạng thái được tạo và cần phải được duy trì, nó sẽ được lưu ở vị trí lưu trữ không thay đổi, như ổ cứng, so với tệp tạm thời hoặc bộ nhớ truy cập ngẫu nhiên dễ bay hơi (RAM).

## Các loại kho lưu trữ

Bộ nhớ là một trong những thành phần cốt lõi của hệ thống máy tính và có thể được phân loại thành
nhiều loại, nhưng có hai loại chính:

### Bộ nhớ dễ bay hơi (Bộ nhớ)

Cần cung cấp điện liên tục để lưu trữ / lưu giữ dữ liệu. Nó đóng vai trò là nơi lưu trữ chính của thiết bị để tạm thời lưu trữ dữ liệu và quản lý khối lượng công việc của các ứng dụng. Bộ nhớ đệm và bộ nhớ truy cập ngẫu nhiên là những ví dụ về bộ nhớ không linh hoạt (RAM).

### Không lưu trữ dễ bay hơi

Một loại thiết bị lưu trữ lưu giữ dữ liệu kỹ thuật số ngay cả khi nó đã tắt hoặc nguồn điện không được cung cấp. Đây thường được coi là thiết bị lưu trữ thứ cấp và được sử dụng cho các hoạt động I / O liên quan đến việc lưu trữ dữ liệu vĩnh viễn. Đĩa cứng, bộ lưu trữ USB và phương tiện quang học là những ví dụ về lưu trữ dễ bay hơi.

## Dư

Dự phòng là một khái niệm ngụ ý việc sao chép các thành phần hoặc chức năng thiết yếu của hệ thống để tăng độ tin cậy của hệ thống, thường ở dạng dự phòng hoặc dự phòng an toàn hoặc để nâng cao hiệu suất thực tế của hệ thống. Thuật ngữ dự phòng được sử dụng bởi vì nếu mọi thứ hoạt động bình thường, thiết bị trùng lặp hoặc thiết bị có thẩm quyền sẽ không làm gì cả và là dự phòng.

Dự phòng phát huy tác dụng khi chúng ta cần ngăn chặn một điểm lỗi duy nhất (Một điểm lỗi duy nhất trong hệ thống là điểm có thể dẫn đến sự cố của hệ thống). Để loại bỏ bất kỳ điểm lỗi nào, chúng ta cần làm cho hệ thống của mình dư thừa hơn. Dự phòng là hành động sao chép hoặc thêm một số phần nhất định trong hệ thống của chúng tôi. Hãy lấy một ví dụ; Hãy tưởng tượng bạn có một hệ thống bao gồm hai máy chủ web dự phòng, giống hệt nhau được cài đặt sau bộ cân bằng tải. Lưu lượng đến từ các máy khách sẽ được phân phối giữa các máy chủ web, nhưng nếu một trong các máy chủ gặp sự cố, bộ cân bằng tải sẽ chuyển hướng tất cả lưu lượng đến máy chủ còn lại đang hoạt động.

** Dự phòng thụ động: ** Khi bạn có nhiều thành phần tại một lớp nhất định trong hệ thống của mình và nếu tại bất kỳ thời điểm nào, một trong số chúng chết, các máy chủ còn lại sẽ tiếp quản và ngăn chặn bất kỳ lỗi nào.

** Dự phòng hoạt động: ** Khi bạn có nhiều máy hoạt động cùng nhau, chỉ một hoặc một số máy thường xử lý lưu lượng truy cập hoặc thực hiện công việc. Nếu một trong số chúng bị lỗi, các máy khác sẽ biết bằng cách nào đó và sau đó tiếp quản.

## Dự phòng so với Nhân rộng

Hai từ thoạt nhìn khá giống nhau, nhưng có một sự khác biệt đáng kể giữa chúng. Mỗi người trong số họ có một cái gì đó để làm với nhiều nút / thành phần / quy trình hơn trong một hệ thống và là một phần chung của hai khái niệm.
+ ** Dự phòng ** - Nó giải thích rằng bạn có nhiều hơn một nút / thành phần / quy trình trong hệ thống và nó khá có lợi trong việc quản lý chuyển đổi dự phòng. Một nút khác trong hệ thống sẽ tiếp quản và tiếp tục nếu một trong các nút bị lỗi. Dự phòng có thể là:
    - hoạt động: tất cả lưu lượng truy cập đến tất cả các nút cùng một lúc.
    - bị động: nơi một nút nhận được lưu lượng truy cập và trong trường hợp không thành công, một nút chuyển sẽ được thực hiện sang nút khác
+ ** Replication ** - Dự phòng được bao gồm, nhưng nó liên quan đến việc sao chép dữ liệu từ nút này sang nút khác hoặc đồng bộ hóa trạng thái giữa các nút. Một ví dụ về nơi thực hiện sao chép là ở cấp cơ sở dữ liệu. Nhân rộng có thể là:
    - ** hoạt động **: mỗi nút nhận từng thông báo để giữ đồng bộ với phần còn lại của các nút.
    - ** passive **: đây là mô hình master-slave, nơi chủ nhận tất cả các yêu cầu và sau đó chuyển tiếp chúng đến các nô lệ.

Tóm lại, “Sao chép là sự đồng bộ hóa trạng thái giữa các nút dự phòng” trong khi “Dự phòng là sự sao chép của các nút, trong trường hợp một số nút bị lỗi.”

> “Nhân rộng đảm bảo Tính nhất quán trong khi Dự phòng tăng độ tin cậy.”
