Trong bài viết này, chúng ta sẽ tìm hiểu cách quản lý tiến trình trong hệ điều hành và các thuật toán liên quan đến nó. Trước khi đi sâu vào tìm hiểu cách quản lý tiến trình thì trước hết ta sẽ xem qua định nghĩa và các khía cạnh liên quan của nó.

Hiểu đơn giản thì một chương trình đang thực thi được gọi là **tiến trình**, hay nói cách khác, tiến trình là một thực thể của chương trình đang chạy, thực thể này có thể được gán và thực thị bởi một trình xử lý. Hai thành phần cốt lỗi của một tiến trình là code của chương trình và tập dữ liệu liên quan đến đoạn code đó.

**Bộ nhớ tiến trình (process memory)** được chia làm bốn phần:
- Phần *program* lưu trữ code của chương trình, đọc từ bộ nhớ điện tĩnh (non-volatile storage) khi chương trình được khởi động. 
- Phần *data* lưu trữ biến toàn cục và biến tĩnh, được cấp phát và khởi tạo trước khi thực thi chương trình chính.
- Phần *heap* được dùng cho quản lý cấp phát bộ nhớ động trong chương trình. Nói cách khác, nó là một phần của bộ nhớ khi thực hiện cấp phát động ví dụ như cấp phát thông qua `new` hay `malloc` và giải phóng thông qua `delete` hay `free`,...
- Phần *stack* lưu trữ biến cục bộ được đinh nghĩa bên trong hàm. Không gian trong stack được tạo cho biến cục bộ khi chúng được khai báo và phần không gian này được giải phóng khi ra khỏi phạm vi của nó.

![](https://ren0503.github.io/system-design/concepts/others/process-in-os/assets/memory.jpeg)

## Process Control Block (PCB)

Một chương trình thực thi như một tiến trình được xác định duy nhất bởi các tham số khác nhau. Các tham số này được lưu trữ trong Process Control Block (PCB) cho mỗi tiến trình. Nó là một cấu trúc dữ liệu lưu trữ các thông tin như sau:
- **Identifier/Process Id**: một định danh duy nhất hay ID liên kết với tiến trình để phân biệt một tiến trình với các tiến trình khác.
- **Process State**: trạng thái tiến trình có thể là `ready`, `running`, `halted`, `completed`,...
- **CPU-Scheduling**: độ ưu tiên so với các tiến trình khác và con trỏ đến hàng đợi định thời (scheduling queues).
- **CPU register và Program Counter**: cần cho lưu trữ và phục hồi khi hoán đổi các tiến trình trong và ngoài CPU.
- **I/O status**: bao gồm các yêu cầu I/O chưa giải quyết, I/O của thiết bị được gán cho tiến trình này, một danh sách các file được sử dụng bởi tiến trình.
- **Memory-Management**: bảng phân trang hoặc bảng phân đoạn.
- **Accounting Information**: dung lượng CPU sử dụng cho thực thi tiến trình, giới hạn thời gian,...

![](https://ren0503.github.io/system-design/concepts/others/process-in-os/assets/pcb.jpeg)

## Trạng thái của tiến trình

Bây giờ, ta sẽ tìm hiểu về tiến trình, khi ta định nghĩa một tham số của tiến trình được gọi là State. Các tiến trình có thể có một trong 5 trạng thái là: start, ready, running, wait và terminated.

![](https://ren0503.github.io/system-design/concepts/others/process-in-os/assets/states.jpeg)

Bây giờ ta sẽ tìm hiểu về cách chuyển đổi trạng thái của chúng:
- **Null -> Start**: khi một tiến trình được tạo, nó được bảo rằng tiến trình đã được khởi tạo hoặc một tiến trình từ trạng thái NULL trở thành một trạng thái Start.
- **Start -> Ready**: hệ điều hành sau đó chuyển một tiến trình từ trạng thái Start sang trạng thái Ready, khi nó chuẩn bị để nhận. Ở giai đoạn này, tiến trình có tất cả tài nguyên khả dụng cần có để chạy với đang chờ đợi để CPU có thời gian thực thi nó.
- **Ready -> Running**: ở chuyển đổi này, hệ điều hành chọn một trong các tiến trình ở trạng thái Ready bằng cách sử dụng bộ định thời tiến trình hoặc dispatcher. Sau đó CPU bắt đầu thực thi tiến trình đã chọn ở trạng thái running.
- **Running -> Terminated**: tiến trình đang chạy hiện tại bị huỷ bởi hệ điều hành nếu tiến trình được đề cập đã hoàn thành.
- **Running -> Ready**: tập định thời chỉ định giới hạn thời gian cho thực thi bất kỳ tiến trình đang hoạt động nào. Nhưng nếu tiến trình hiện tại nhiều hơn thời gian chỉ định bởi bộ định thời, nó sẽ được chuyển lại trạng thái ready. Lý do chính cho chuyển đổi này là để đạt được khoảng thời gian tối đa cho việc thực thi không bị gián đoạn. Hầu hết các hệ điều hành đa chương trình đều bắt buộc ràng buộc thời gian này.
- **Running -> Wait**: nếu một tiến trình muốn bất cứ thứ gì mà nó phải đợi, nó sẽ được đặt ở trạng thái chờ đợi. Quá trình không thể chạy ngay bây giờ vì nó đang chờ một số tài nguyên sẵn có hoặc cho một số sự kiện xảy ra. Ví dụ: quá trình có thể đang đợi nhập liệu bằng bàn phím, yêu cầu truy cập đĩa, thông báo giữa các tiện trình, bộ hẹn giờ hoạt động hoặc quá trình con kết thúc.
- **Wait -> Ready**: Khi sự kiện mà nó đã chờ xảy ra, một quá trình ở trạng thái Waiting sẽ được chuyển sang trạng thái Ready.

**Lưu ý:** Một số hệ thống có thể có các trạng thái khác ngoài những trạng thái được liệt kê ở đây.

## Thực thi một tiến trình trong Hệ điều hành

Hệ điều hành thực thi nhiều hoạt động khác nhau trong khi tạo một tiến trình, khi sử dụng PCB để theo dõi trạng thái thực thi của từng tiến trình.
- Để theo dõi tất cả tiến tình, nó gán một PID (ID của tiến trình) với từng tiến trình để định danh nó là duy nhất. Như đã thảo luận ở trên, nó còn lưu trữ nhiều chi tiết cốt lõi trong PCB.
- Hệ điều hành cập nhật thông tin trong PCB của tiến trình khi nó chuyển từ trạng thái này sang trạng thái khác.
- Để truy cập PCB thường xuyên, hệ điều hành giữ các con trỏ đến từng PCB của tiến trình trong một bảng tiến trình.

![](https://ren0503.github.io/system-design/concepts/others/process-in-os/assets/execution.jpeg)

## Bộ định thời tiến trình trong Hệ điều hành

Định thời tiến trình là rất quan trọng để chọn và loại bỏ tiến trình đang chạy dựa trên một chiến lược hoặc thuật toán cụ thể. Các mục tiêu chính của quá trình định thời tiến trình là giữ cho CPU luôn bận rộn và cung cấp thời gian phản hồi "có thể chấp nhận được" cho tất cả các chương trình. Hệ điều hành đa chương trình cho phép nhiều tiến trình được tải vào bộ nhớ thực thi tại một thời điểm và tiến trình được tải chia sẻ CPU bằng cách sử dụng ghép kênh thời gian.

Hệ điều hành có ba loại bộ định thời để định thời tiến trình.

**Bộ định thời dài hạn (Job scheduler):** bộ định thời này đưa tiến trình mới về trạng thái Ready. Nó xác định tiến trình nào được gán cho CPU để xử lý, chọn các tiến trình từ hàng đợi và tải chúng vào bộ nhớ để thực thi.

- Mục tiêu chính của bộ định thời dài hạn là cung cấp sự kết hợp cân bằng giữa các công việc (chẳng hạn như giới hạn I/O và ràng buộc trình xử lý) và kiểm soát mức độ đa chương trình. Đây là một hệ thống được tải nhiều, có thể dành thời gian để triển khai các thuật toán định thời thông minh và nâng cao.

**Bộ định thời ngắn hạn (CPU scheduler):** Nó chịu trách nhiệm chọn một tiến trình từ trạng thái Ready và lên lịch cho nó đến trạng thái Running. Nó còn được gọi là Dispatchers. 

   - Bộ định thời CPU chịu trách nhiệm đảm bảo không bị chết đói do các tiến trình thời gian bùng nổ cao. 
    - Nó chạy rất thường xuyên và nhanh chóng hoán đổi một quá trình từ trạng thái Running sang trạng thái Ready.

**Bộ định thời trung hạn:** Nó chịu trách nhiệm hoán đổi các tiến trình khi một quy trình cụ thể đang thực hiện thao tác I/O. Nếu một tiến trình đang chạy thực hiện một yêu cầu I/O, nó có thể bị tạm dừng. Tiến trình đã bị tạm ngừng sẽ không thể đạt được bất kỳ tiến độ nào để hoàn thành. Tiến trình bị treo được chuyển sang bộ nhớ thứ cấp trong tình huống này để xóa nó khỏi bộ nhớ và nhường chỗ cho các tiến trình khác. Điều này được gọi là chuyển mạch, và tiến trình này được gọi là chuyển đổi hoặc triển khai.

![](https://ren0503.github.io/system-design/concepts/others/process-in-os/assets/medium-term.jpeg)

## Định thời CPU trong Hệ điều hành

Bây giờ mục tiêu tiếp theo của chúng ta là hiểu khái niệm về định thời CPU và tại sao chúng ta cần nó. Thời gian cho I/O và CPU đều được sử dụng trong một tiến trình điển hình. Thời gian chờ đợi I/O trong một hệ điều hành cũ như MS-DOS bị lãng phí và CPU đang rảnh rỗi trong thời gian này. 

Một tiến trình có thể sử dụng CPU trong khi một tiến trình khác đợi I/O trong hệ điều hành đa chương trình. Chỉ định thời tiến trình mới cho phép điều này. Định thời CPU là quá trình xác định quá trình nào sẽ có quyền sử dụng riêng đối với CPU trong khi một tiến trình khác bị tạm dừng. Mục tiêu cơ bản của định thời CPU là đảm bảo rằng bất cứ khi nào CPU rãnh, HĐH sẽ chọn ít nhất một trong các chương trình trong hàng đợi sẵn sàng để chạy. Bộ định thời CPU sẽ phụ trách quá trình lựa chọn. Nó chọn một trong số các tiến trình đang sẵn sàng chạy trong bộ nhớ.

## Các kiểu định thời CPU

Có hai kiểu định thời CPU chính là:

**1. Định thời preemptive:** các tác vụ thường được giao với mức độ ưu tiên của chúng trong. Ngay cả khi hoạt động có mức độ ưu tiên thấp hơn vẫn đang chạy, đôi khi cần phải chạy một tác vụ có mức độ ưu tiên cao hơn trước một tác vụ có mức độ ưu tiên thấp hơn. Tác vụ có mức độ ưu tiên thấp hơn được tạm dừng trong một thời gian và sau đó tiếp tục khi tác vụ có mức độ ưu tiên cao hơn được hoàn thành.
**2. Định thời non-preemptive:** CPU đã được gán cho một tiến trình nhất định trong cơ chế định thời này. Quá trình giữ CPU bị chiếm đóng sẽ chuyển đổi ngữ cảnh hoặc kết thúc để giải phóng CPU. Đây là phương pháp duy nhất hoạt động trên nhiều nền tảng phần cứng. Đó là bởi vì, không giống như định thời preemptive, nó không yêu cầu bất kỳ phần cứng cụ thể nào như bộ hẹn giờ.

### Sự khác biệt giữa định thời Preemptive và Non-Preemptive

1. Trong preemptive, bộ nhớ được cấp phát trong bộ nhớ chính của CPU với thời gian giới hạn, nó có thể được gán cho bất kỳ tiến trình nào khác phụ thuộc vào trạng thái của tiến trình hiện tại hoặc độ ưu tiên của tiến trình mới đến. Trong khi với Non-preemptive, bộ nhớ được cấp phát cho cùng một tiến trình đến khi nó hoàn thành.
2. Trong preemptive, nếu các tiến trình có mức độ ưu tiên cao tiếp tục diễn ra thì tiến trình có mức độ ưu tiên thấp sẽ vẫn bị gián đoạn trong thời gian không xác định. Trong khi với định thời Non-preemptive, nếu bất kỳ tiến trình lớn nào đang xử lý, nó sẽ tiếp tục xử lý và sẽ không cho phép một tiến trình dù rất nhỏ xử lý trước khi thực thi hoàn chỉnh.
3. Trong preemptive, nó phải lưu tất cả dữ liệu của tiến trình ở trạng thái tạm dừng để nó chỉ có thể tiếp tục từ thời điểm đó trong khi không có yêu cầu nào như vậy trong định thời Non-preemptive.

## Các giải thuật định thời trong hệ điều hành

Bây giờ, ta sẽ tìm hiểu một vài giải thuật định thời khác nhau về Quản lý tiến trình. 

### First Come First Serve (FCFS)

Đây là giải thuật định thời CPU cơ bản và trực quan nhất. Tiến trình đầu tiên yêu cầu CPU sẽ được nhận phân bổ CPU đầu tiên trong phương thức này. Hàng đợi FIFO được sử dụng để quản lý chiến lược định thời này. PCB của tiến trình được liên kết với phần đuôi của hàng đợi khi nó đi vào. Do đó, bất cứ khi nào CPU trở nên khả dụng, nó sẽ được gán cho tiến trình ở đầu hàng đợi.

Vài điểm quan trọng của phương thức này:
- Nó cung cấp giải thuật định thời preemptive và non-preemptive.
- Công việc luôn được thực hiện theo thứ tự đến trước, phục vụ trước.
- Rất dễ triển khai và sử dụng.
- Hiệu suất tệ và thời gian đợi thường rất cao.

Giả sử chúng ta có 5 tiến trình p1, p2, p3, p4, p5 và chúng được nhận bởi hàng đợi sẵn sàng tại thời điểm t1, t2, t3, t4, t5 sao cho t1 <t2 <t3 <t4 <t5. Do đó p1 đến đầu tiên trong hàng đợi sẵn sàng và do đó nó sẽ được thực thi đầu tiên, tiếp theo là p2, p3, p4 và p5 tương ứng.

#### Hiệu ứng Convoy

Trong loại giải thuật FCFS (First Come First Serve), nếu một hiệu ứng nhất định với thời gian chiếm dụng CPU lớn đến trước bất kỳ tiến trình nhỏ nào thì tiến trình nhỏ sẽ bị chặn bởi tiến trình lớn đó và hiệu ứng này được gọi là Hiệu ứng Convoy.

### Shortest Job First (SJF)

Đây là giải thuật non-preemptive. Nó là một chính sách định thời ưu tiên cái tiến trình đang đợi có thời gian thực thi ngắn. Trong tất cả các giải thuật định thời SJF có lợi thế là có thời gian chờ đợi trung bình ngắn nhất. Đầu tiên, nó sắp xếp tất cả các tiến trình theo thời gian đến. Sau đó chọn phương thức có thời gian đến ngắn nhất và thời gian thực thi ngắn nhất. Sau khi chọn, hãy tạo một nhóm các tiến trình sẽ chạy khi tiến trình trước đó hoàn tất, sau đó chọn tiến trình có thời gian thực thi ngắn nhất từ nhóm.

Vài điểm quan trọng của phương thức này:
- Các tiến trình ngắn được xử lý rất nhanh chóng.
- Hệ thống cũng có chi phí thấp vì nó chỉ đưa ra quyết định khi một tiến trình kết thúc hoặc một tiến trình mới được thêm vào.
- Khi một tiến trình mới được thêm vào, giải thuật chỉ phải so sánh tiến trình hiện đang chạy với quy trình mới, bỏ qua bất kỳ tiến trình nào khác đang chờ chạy.
- Các tiến trình dài có thể bị hoãn vô thời hạn nếu các tiến trình ngắn được thêm vào một cách thường xuyên.
- Nó còn được phân loại thành hai loại:
    + Định thời ưu tiên preemptive nếu do tiến trình mới đến có thời gian sử dụng CPU nhỏ hơn, tiến trình hiện tại được chuyển sang trạng thái tạm dừng và tiến trình mới tiếp tục thực hiện.
    + Độ ưu tiên non-preemptive.
- Định thời nếu tiến trình đến có thời gian sử dụng CPU nhỏ hơn tiến trình hiện tại không bị xáo trộn.

Ví dụ đơn giản về giải thuật này:

Giả sử chúng ta có 5 tiến trình p1, p2, p3, p4, p5 và chúng được nhận bởi hàng đợi sẵn sàng tại thời điểm t1, t2, t3, t4, t5 sao cho t1 <t2 <t3 <t4 <t5. Bây giờ, bạn có thể giả sử lần này hàng đợi sẵn sàng là hàng đợi ưu tiên sắp xếp lại tiến trình đến trên cơ sở thời gian sử dụng CPU. Do đó, tiến trình có thời gian sử dụng CPU ít nhất sẽ được phân phối trước, ...

### Longest Job First (LJF) 

Đây cũng là một giải thuật định thời non-preepmtive. Giải thuật này chủ yếu theo dõi thời gian thực thi của tất cả các tiến trình có thể truy cập tại thời điểm đến, sau đó chỉ định bộ xử lý cho tiến trình có thời gian thực thi dài nhất. Trong giải thuật này, khi một tiến trình bắt đầu chạy, nó không thể bị tạm dừng giữa chừng. Chỉ cho đến khi tiến trình được cấp phát hoàn tất tiến trình xử lý của nó và bị kết thúc thì bất kỳ tiến trình nào khác mới có thể được thực hiện. Nó sắp xếp các tiến trình theo thứ tự tăng dần của thời gian đến của chúng. Sau đó, trong số tất cả các tiến trình đã đến thời điểm đó, nó sẽ chọn tiến trình có thời gian thực thi lâu nhất. Sau đó, nó sẽ xử lý nó trong suốt thời gian thực thi. Cho đến khi tiến trình này hoàn tất quá trình thực thi, LJF sẽ giám sát xem có thêm tiến trình nào nữa hay không.

Vài điểm quan trọng của phương thức này:
- Thuật toán này làm giảm tốc độ xử lý, dẫn đến giảm hiệu suất và sử dụng hệ thống.
- Thời gian chờ trung bình và thời gian quay vòng trung bình cho một nhóm thủ tục cụ thể tăng lên do cách tiếp cận này.
- Với kỹ thuật này, có thể một tiến trình ngắn sẽ không bao giờ được thực thi, trong khi hệ thống tiếp tục chạy các tiến trình lớn.

Một ví dụ đơn giản về Thuật toán này:

Tương tự như ví dụ trên nhưng bạn có thể giả sử ở đây rằng cùng một hàng đợi sẵn sàng ưu tiên dựa trên thời gian sử dụng CPU lớn hơn ở lần đầu tiên, tức là trong số năm tiến trình đó, tiến trình nào có thời gian sử dụng CPU lớn nhất sẽ được thực thi trước tiên, ...

### Round Robin (RR)

Round Robin là một hệ thống định thời cho CPU, trong đó mỗi tiến trình được ấn định một khoảng thời gian đã định theo chu kỳ. Giải thuật Round Robin được tạo ra với các hệ thống chia sẻ thời gian. Nó này tương tự như định thời FCFS, ngoại trừ việc nó bao gồm quyền ưu tiên, cho phép hệ thống chuyển đổi giữa các tiến trình. Mỗi tiến trình có một khoảng thời gian nhất định được ấn định cho nó và khi khoảng thời gian đó trôi qua, tiến trình này đã được ưu tiên và một tiến trình khác sẽ diễn ra. Kết quả là, tất cả các tiến trình nhận được một lượng thời gian bằng nhau của CPU. Thuật toán này hoạt động tốt nhất về thời gian phản hồi trung bình. 

Một số điểm quan trọng của phương pháp này:
- Round robin là một giải thuật ưu tiên trước và tương tự như FCFS với một số cải tiến
- CPU được chuyển sang tiến trình tiếp theo sau một khoảng thời gian cố định.
- Phương pháp định thời được sử dụng rộng rãi trong các hệ điều hành truyền thống.

Một ví dụ đơn giản với giải thuật này:

Một lần nữa, giả sử chúng ta có 5 tiến trình p1, p2, p3, p4, p5 và để chúng có tổng thời gian thực hiện là t1, t2, t3, t4 và t5. Bây giờ, chúng ta có thêm một yếu tố t' (thời gian) sẽ đảm bảo việc chia sẻ thời gian CPU bằng nhau cho mỗi tiến trình. Giả sử trạng thái đầu tiên đến và sau thời gian t', tiến trình p1 này được thực hiện trong (t1 - t') thời gian. Bây giờ, nó chuyển sang trạng thái chờ, nơi nó có thể thực hiện hoạt động I/O của mình nhưng bây giờ bộ nhớ chính được giải phóng cho tiến trình tiếp theo p2. Sau khi hoàn thành hoạt động I / O của nó, tiến trình p1 lại được đẩy đến hàng đợi sẵn sàng cho chu kỳ xử lý tiếp theo của nó. Dữ liệu của tiến trình p1 để thực hiện nó cho đến (t1 - t ') đã được CPU lưu để nó có thể tiếp tục từ trạng thái đó trong chu kỳ tiếp theo. Điều này cũng xảy ra với tất cả các tiến trình.

### Định thời dựa trên độ ưu tiên

Định thời dựa trên độ ưu tiên là một trong những phương pháp định thời hàng loạt thường được sử dụng nhất. Một mức độ ưu tiên được chỉ định cho mỗi tiến trình. Tiến trình ưu tiên cao nhất được thực hiện trước. Mức độ ưu tiên có thể được xác định bởi giới hạn bộ nhớ, giới hạn thời gian hoặc bất kỳ hạn chế tài nguyên nào khác. Định thời ưu tiên không phải lúc nào cũng đặt ưu tiên là nghịch đảo của thời gian thực thi CPU và bộ nhớ; thay vào đó, nó có thể được đặt bên trong hoặc bên ngoài, nhưng việc định thời được thực hiện trên cơ sở độ ưu tiên của tiến trình, với các tiến trình khẩn cấp nhất được xử lý trước, sau đó là các tiến trình có thứ tự ưu tiên thấp hơn.

Một số điểm quan trọng của phương pháp này:
- Trong giải thuật định thời ưu tiên, khả năng bị chặn vô thời hạn hoặc chết đói.
- Chúng ta có thể tận dụng khái niệm lão hóa để ngăn chặn sự chết đói của bất kỳ tiến trình nào bằng cách tăng mức độ ưu tiên của các tiến trình có mức độ ưu tiên thấp dựa trên thời gian chờ đợi của chúng.
- Nó cũng được phân loại thành hai loại:
    + Định thời ưu tiên preemptive: nếu tiến trình mới có mức độ ưu tiên cao hơn, Định thời ưu tiên preemptive trình hiện tại được chuyển sang trạng thái tạm dừng và thực hiện tiến trình mới.
    - Định thời ưu tiên non-preemptive  nếu do tiến trình có mức độ ưu tiên cao hơn sắp đến, tiến trình hiện tại không bị xáo trộn.

Một ví dụ đơn giản về giải thuật này:

Tương tự như ví dụ về giải thuật FCFS, các tiến trình được chèn vào hàng đợi sẵn sàng nhưng ở đây trên cơ sở mức độ ưu tiên bây giờ có thể là thời gian thực thi CPU, giới hạn bộ nhớ, v.v. và sau đó việc thực thi của nó tương tự như thuật toán FCFS
