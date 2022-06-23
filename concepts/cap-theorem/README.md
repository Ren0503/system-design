# Định lý CAP: Khái niệm Thiết kế Hệ thống

[Version English](./README_EN.md)

![](./assets/cap-theorem-in-rdbms.svg)

Định lý CAP là một trong những khái niệm quan trọng được sử dụng trong hệ thống phân tán. Trong bài viết này, chúng ta sẽ đề cập đến các khái niệm cơ bản liên quan đến định lý CAP và khả năng áp dụng của nó cho các hệ thống khác nhau.

## Định lý CAP là gì?

Định lý CAP là khái niêmj cốt lõi cho việc thiết kế các hệ thống dữ liệu chia sẻ trên toàn mạng. Nó nói rằng một hệ thống cơ sở dữ liệu phân tán chỉ có thể đáp ứng hai trong số ba chức năng sau: *tính nhất quán*, *tính khả dụng* và *dung sai phân vùng*. Chúng ta có thể cân bằng giữa ba chức năng trên dựa trên các trường hợp cụ thể sử dụng cho hệ thống.

## Tại sao định lý CAP lại quan trọng?

Trong một hệ thống phân tán, chúng ta cần lưu trữ dữ liệu qua nhiều nút và đồng thời cần giao tiếp qua mạng. Do sự phụ thuộc quá lớn vào các cuộc gọi mạng, hệ thống phân tán thường rơi vào bẫy lỗi mạng. Vì vậy dung sai phân vùng là điều cần thiết. Trong trường hợp như vậy, chúng ta cần phải lựa chọn giữa tính nhất quán hoặc tính khả dụng dựa trên yêu cầu của chúng ta.

Bất cứ khi nào tính nhất quán được ưu tiên hơn tính khả dụng, thì sẽ là một thách thức đối với hệ thống để trả về dữ liệu gần đây nhất. Nó sẽ trả về một lỗi nếu thông tin cụ thể không thể được đảm bảo là đã cập nhật. Tương tự, bất cứ khi nào tính khả dụng được ưu tiên hơn tính nhất quán, hệ thống sẽ trả về phiên bản thông tin có sẵn gần đây nhất. Vì vậy, điều cần thiết là phải hiểu định lý CAP khi thiết kế bất kỳ ứng dụng đám mây hoặc hệ thống nối mạng nào. Việc lựa chọn một hệ thống quản lý dữ liệu đáp ứng các yêu cầu quan trọng của hệ thống trở nên thuận tiện.

Chúng ta hãy hiểu các chức năng của cả ba khái niệm.

## Tính nhất quán trong định lý CAP

Nhất quán có nghĩa là mọi thứ phải diễn ra theo cách phối hợp nhịp nhàng với sự đồng bộ hóa thích hợp. Nó đảm bảo rằng tất cả các client sẽ thấy cùng một dữ liệu đồng thời, bất kể chúng được kết nối với nút nào. Thực hiện thao tác đọc sẽ trả về giá trị thao tác ghi gần đây nhất, khiến tất cả các nút trả về cùng một dữ liệu. Bất cứ khi nào dữ liệu được ghi trên nút, thì trách nhiệm cao nhất của nút là chuyển ngay dữ liệu đến tất cả các nút khác trong hệ thống.

## Tính khả dụng trong định lý CAP

Tính khả dụng có nghĩa là hệ thống luôn ở đó và sẵn sàng bất cứ khi nào có yêu cầu. Khi bất kỳ ứng dụng phía client nào yêu cầu dữ liệu, nó sẽ nhận được phản hồi, ngay cả khi một hoặc nhiều nút gặp sự cố. Do đó, để đạt được tính khả dụng trong một hệ thống phân tán, hệ thống phải duy trì hoạt động mọi lúc. Mọi client sẽ nhận được phản hồi, bất kể trạng thái của bất kỳ nút riêng lẻ nào trong hệ thống.

## Dung sai phân vùng trong định lý CAP

Dung sai phân vùng là cần thiết cho một hệ thống phân tán. Vì vậy, ở hầu hết trường hợp chúng ta luôn cần phải lựa chọn giữa tính khả dụng và tính nhất quán. Nó tương ứng với điều kiện hệ thống phải hoạt động bất kể có sự cố nào xảy ra với các nút hay độ trễ giữa các nút hay không. Nói cách khác, điều kiện này nói rằng hệ thống sẽ tiếp tục chạy, bất kể độ trễ và không nhất quán. Nó sẽ duy trì bất kỳ sự cố mạng nào bằng cách sao chép đầy đủ các bản ghi dữ liệu qua các nút và mạng có thể có khác nhau để ngăn hệ thống khỏi bất kỳ lỗi nào.

## Định lý CAP trong kiến trúc Cơ sở dữ liệu

Các mạng phân tán phụ thuộc rất nhiều vào cơ sở dữ liệu NoSQL vì chúng cung cấp khả năng mở rộng theo chiều ngang và chúng có tính phân tán cao. Do đó, chúng có thể dễ dàng và nhanh chóng mở rộng quy mô trên một mạng lưới ngày càng tăng gồm nhiều nút kết nối với nhau. Nhưng như đã thảo luận ở trên, người ta chỉ có thể có hai trong ba chức năng có sẵn. Các cách kết hợp khác nhau và các trường hợp sử dụng của chúng được thảo luận dưới đây:
- **Hệ thống CP**: Hệ thống này tập trung nhiều hơn vào tính nhất quán và dung sai phân vùng. Vì vậy, các hệ thống này không khả dụng ở hầu hết thời gian. Khi bất kỳ sự cố nào xảy ra trong hệ thống, nó phải tắt nút không nhất quán cho đến khi phân vùng được giải quyết và trong thời gian đó, nó không khả dụng.
- **Hệ thống AP**: Loại cơ sở dữ liệu này tập trung nhiều hơn vào tính khả dụng và khả năng chịu phân vùng hơn là tính nhất quán. Khi bất kỳ sự cố nào xảy ra trong hệ thống, thì nó sẽ không còn ở trạng thái nhất quán nữa. Tuy nhiên, tất cả các nút vẫn khả dụng và các nút bị ảnh hưởng có thể trả về phiên bản dữ liệu trước đó và hệ thống sẽ mất một thời gian để trở nên nhất quán.
- **Hệ thống CA**: Loại cơ sở dữ liệu này tập trung nhiều hơn vào tính nhất quán và tính khả dụng trên tất cả các nút hơn là dung sai phân vùng. Dung sai lỗi là điều cần thiết cơ bản của bất kỳ hệ thống phân tán nào, do đó hầu khi sử dụng kiểu kiến ​​trúc CA cho bất kỳ mục đích thực tế nào.

## Các trường hợp sử dụng của Định lý CAP

MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL phổ biến tập trung vào kiểu cơ sở dữ liệu CP. Nó giải quyết các phân vùng mạng bằng cách duy trì tính nhất quán trong khi vẫn ảnh hưởng đến tính khả dụng.

Cassandra cũng là một cơ sở dữ liệu NoSql phổ biến tập trung vào kiểu cơ sở dữ liệu AP. Nó tập trung hoàn toàn vào tính khả dụng và dung sai phân vùng hơn là tính nhất quán. Nhưng Cassandra cung cấp sự nhất quán cuối cùng bằng cách tìm ra tất cả các điểm mâu thuẫn trong một khoảng thời gian nhất định.

Các ứng dụng dựa trên microservices cũng phụ thuộc nhiều vào định lý CAP để thiết kế cơ sở dữ liệu hiệu quả nhất cho ứng dụng. Ví dụ: nếu khả năng mở rộng theo chiều ngang là cần thiết đối với ứng dụng với tính nhất quán cuối cùng, thì cơ sở dữ liệu AP như Cassandra có thể giúp đáp ứng các yêu cầu triển khai và đơn giản hóa việc triển khai. Mặt khác, nếu ứng dụng phụ thuộc nhiều vào tính nhất quán của dữ liệu như trong dịch vụ thanh toán, thì sẽ tốt hơn nếu chọn cơ sở dữ liệu quan hệ như PostgreSQL.

## Kết luận

Hệ thống phân tán cho phép chúng ta đạt được mức độ khả dụng, tính sẵn sàng tương đối cao hơn và cung cấp phạm vi cho khả năng mở rộng. Điều cần thiết là thiết kế các hệ thống bằng cách xem xét các kết quả thực tế trong đời sống thực và chọn thiết kế thích hợp nhất phù hợp với ứng dụng của chúng ta. Nó là một kiến ​​trúc phức tạp đòi hỏi quản lý mạng hiệu quả. Vì vậy, điều cần thiết là phải hiểu sự phức tạp phát sinh trong các hệ thống phân tán, thực hiện các đánh đổi thích hợp cho yêu cầu và chọn công cụ phù hợp.