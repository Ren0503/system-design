# Thiết Kế Hệ Thống Twitter

![](./assets/logo.jpg)

Thiết kế dịch vụ mạng xã hội tương tự như trang Twitter. Người dùng có thể tweet, theo dõi người dùng khác hay các tweet yêu thích.

- Độ khó: Trung bình

## 1. Twitter là gì?

Twitter là một dịch vụ mạng xã hội trực tuyến trong đó người dùng đăng hay đọc những đoạn văn bản ngắn gọi là **tweets**. Người dùng đã đăng ký tài khoản có thể đăng hay đọc tweet, còn những ai chưa thì chỉ có thể đọc. Người dùng có thể truy cập Twitter trên trang web hay ứng dụng di động.

## 2. Yêu cầu và mục tiêu của hệ thống

Ta sẽ thiết kế một phiên bản đơn giản của Twitter với các yêu cầu sau:

### Yêu cầu bắt buộc

1. Người dùng có thể đăng tweet mới
2. Người dùng có thể theo dõi người dùng khác.
3. Người dùng có thể đánh dấu tweet là yêu thích.
4. Dịch vụ hỗ trợ và hiển thị timeline cho người dùng bao gồm các tweet nổi bật của tất cả người mà họ theo dõi.
5. Tweet cũng có thể là ảnh hoặc video.

### Yêu cầu không bắt buộc

1. Dịch vụ nên có tính khả dụng cao
2. Độ trễ chấp nhận được là 200ms cho mỗi lần tạo timeline.
3. Tính nhất quán có thể hi sinh để đổi lại độ khả dụng. Ví dụ nếu người dùng không thấy một tweet trong cùng một lúc, đó không phải vấn đề.

### Yêu cầu mở rộng

1. Tìm kiếm tweet
2. Phản hồi tweet
3. Chủ đề nội bật - chủ đề hiện tại đang có nhiều tìm kiếm
4. Gắn thẻ (tag) người khác
5. Thông báo tweet
6. Gợi ý người nên theo dõi
7. Kỷ niệm

## 3. Tính toán ước lượng

Giả sử ta có một tỷ người dùng với 200 triệu người dùng hoạt động mỗi ngày (DAU). Ta giả sử có 100 triệu tweet mới mỗi ngày và trung bình mỗi người theo dỗi 200 người khác.

**Bao nhiêu lượt thích mỗi ngày?** Nếu trung bình, mỗi người yêu thích 5 tweet mỗi ngày ta sẽ có:

> 200M users * 5 favorites = 1B favorites

**Bao nhiêu lượt xem tweet mà hệ thống cần tạo?** Giả sử trung bình một người dùng đến xem timeline của họ hai lần một ngày và xem của 5 người khác. Ở mỗi trang họ xem trung bình 20 tweet thì hệ thống sẽ cần tạo 28 tỷ/lượt xem tweet mỗi ngày:

> 200M DAU * ((2 + 5) * 20 tweets) = 28B/day

**Ước lượng lưu trữ** Giả sử mỗi tweet có 140 ký tự, mỗi ký tự ta cần hai bytes để lưu trữ không nén. Giả sử ta cần thêm 30 bytes nữa cho lưu trữ metadata với mỗi tweet (như ID, timestamp, userID,...). Tổng dung lượng mà ta cần sẽ là:

> 100M * (280 + 30) bytes => 30GB/day

Không phải lúc nào các tweet cũng có ảnh hay video nhưng ta giả sử trung bình 50 tweet có một ảnh và 10 video. Giả sử kích thước trung bình của một ảnh là 200KB và một video là 2MB. Điều này đồng nghĩa ta sẽ cần 24TB mới mỗi ngày.

> (100M/5 photos * 200KB) + (100M/10 videos * 2MB) ~= 24TB/day

**Ước lượng băng thông** Vì tổng đầu vào là 24TB mỗi ngày, nghĩa là ta cần chuyển vào 290MB/s.

Nhớ lại ta có 28 tỷ lượt xem tweet mỗi ngày. Ta phải hiển thị ảnh cho tất cả tweet (nếu có), nhưng giải sử người dùng chỉ xem mõi 3 video trong timeline họ. Nên tổng đầu ra sẽ là:

> (28B * 280 bytes) / 86400s of text => 93MB/s
> + (28B/5 * 200KB ) / 86400s of photos => 13GB/S
> + (28B/10/3 * 2MB ) / 86400s of Videos => 22GB/s
> Total ~= 35GB/s

### 4. API hệ thống

Ta có thể sử dụng SOAP hoặc REST API để xuất các chức năng của hệ thống. Ta có thể định nghĩa API cho đăng tweet mới như sau:

```
tweet(api_dev_key, tweet_data, tweet_location, user_location, media_ids)
```

**Tham số**:
- `api_dev_key` (string): khoá API dev của tài khoản đã đăng ký. Được dùng để điều chỉnh người dùng dựa trên chỉ tiêu được phân bổ của họ.
- `tweet_data` (string): Nội dung đoạn tweet, có thể lên đến 140 ký tự.
- `tweet_location` (string): Vị trí tuỳ chọn (kinh độ, vĩ độ) mà đoạn tweet đề cập đến.
- `user_location` (string): Vị trí tuỳ chọn (kinh độ, vĩ độ) của người dùng đăng tweet.
- `media_ids` (number[]): Danh sách media_ids tùy chọn được liên kết với Tweet. (tất cả ảnh, video,... cần được tải lên riêng).

**Trả về**: (string)
Một bài đăng thành công sẽ trả về URL để truy cập vào tweet đó. Nếu không, sẽ trả về lỗi HTTP thích hợp.

## 5. Thiết kế

Ta cần một hệ thống có thể lưu trữ hiệu quả tất cả các tweet, ta cần lưu 100M/86400s => 1150 tweet trên mỗi giây và đọc 28B/86400 => 325K tweet trên mỗi giây. Rõ ràng dựa trên các yêu cầu trên thì hệ thống của ta sẽ thiên về đọc hơn là ghi.

Ở thiết kế cấp cao, ta cần nhiều server để phục vụ tất cả yêu cầu này với bộ cân bằng tải ở phía trước chúng để phân bố đồng đều lưu lượng truy cập. Ở phía backend, ta cần một cơ sở dữ liệu hiệu quả để lưu trữ tất cả tweet mới và có thể hỗ trợ một lượng lớn yêu cầu đọc. Ta cũng cần một bộ lưu trữ file cho lưu trữ ảnh và video.

![](./assets/high-level-design.png)

Mặc dù yêu cầu ghi hàng ngày dự kiến của chúng ta là 100 triệu và yêu cầu đọc là 28 tỷ tweet. Điều này có nghĩa là trung bình hệ thống của chúng ta sẽ nhận được khoảng 1160 tweet mới và 325K yêu cầu đọc mỗi giây. Tuy nhiên, lưu lượng truy cập này sẽ được phân phối không đồng đều trong ngày, vào thời gian cao điểm, chúng ta có thể mong đợi ít nhất vài nghìn yêu cầu ghi và khoảng 1 triệu yêu cầu đọc mỗi giây. Chúng ta nên ghi nhớ điều này trong khi thiết kế kiến trúc của hệ thống của mình.

## 6. Lược đồ cơ sở dữ liệu

Ta cần lưu trữ dữ liệu bao gồm người dùng, tweet của họ, lượt yêu thích và người mà họ theo dõi.

![](./assets/database-schema.svg)

Để lựa chọn giữa cơ sở dữ liệu SQL và NoSQL để lưu trữ lược đồ trên, ta có thể xem lại phần **Lược đồ cơ sở dữ liệu** ở bài thiết kế Instagram.

## 7. Phân đoạn dữ liệu

Vì ta có một lượng lớn tweet mỗi ngày và lưu lượng tải cho việc đọc là rất cao, ta cần phân phối dữ liệu của chúng ta trên nhiều máy để có thể đọc/ghi hiệu quả hơn. Ta có nhiều lựa chọn để thực hiện phân đoạn dữ liệu (data sharding), chúng ta hãy xem qua từng cái một:

**Sharding dựa trên UserID**: Ta có thể lưu trữ tất cả dữ liệu của một người dùng tại một server. Trong khi lưu trữ ta có thể truyền UserID để hàm băm của chúng ta ánh xạ người dùng với một server cơ sở dữ liệu trong đó ta sẽ lưu tất cả tweet, yêu thích, theo dõi của người dùng đó. Đến khi truy vấn tweet hay lượt yêu thích của một người dùng, ta có thể hỏi hàm băm của chúng ta nơi có thể tìm thấy dữ liệu của người dùng và sau đó đọc dữ liệu đó từ đó. Tuy nhiên cách tiếp cận này có một số vấn đề:

1. Điều gì sẽ xảy ra nếu một người dùng trở nên nổi tiếng? Có thể có rất nhiều truy vấn đến với server lưu trữ người dùng đó. Tải trọng cao sẽ ảnh hưởng đến hiệu suất của hệ thống chúng ta.
2. Theo thời gian, một số người dùng có thể có rất rất nhiều tweet hoặc lượt theo dõi so với những người khác. Việc duy trì sự phân bổ đồng đều của dữ liệu người dùng đang tăng lên là điều khá khó khăn.

Để khắc phục những tình huống này, chúng ta phải phân vùng lại/phân phối lại dữ liệu của mình hoặc sử dụng hàm băm nhất quán.

**Sharding dựa trên TweetID**: Hàm băm của chúng ta sẽ ánh xạ mỗi TweetID đến một server ngẫu nhiên, nơi chúng ta sẽ lưu trữ Tweet đó. Để tìm kiếm các tweet, chúng ta phải truy vấn tất cả các server và mỗi server sẽ trả về một tập hợp các tweet. Server tập trung sẽ tổng hợp các kết quả này để trả lại cho người dùng. Hãy xem xét ví dụ tạo timeline; đây là số bước mà hệ thống của chúng ta phải thực hiện để tạo timeline của người dùng:

1. Server ứng dụng (app) của chúng ta sẽ tìm tất cả những người mà người dùng theo dõi.
2. Server ứng dụng sẽ gửi truy vấn đến tất cả các server cơ sở dữ liệu để tìm các tweet từ những người này.
3. Mỗi server cơ sở dữ liệu sẽ tìm các tweet cho từng người dùng, sắp xếp chúng theo lần truy cập gần đây và trả về các tweet hàng đầu.
4. Server ứng dụng sẽ hợp nhất tất cả các kết quả và sắp xếp lại để trả về kết quả hàng đầu cho người dùng.

Cách tiếp cận này giải quyết vấn đề người dùng nổi tiếng, nhưng ngược lại với phân vùng bằng `UserID`, chúng ta phải truy vấn tất cả các phân vùng cơ sở dữ liệu để tìm các tweet của người dùng, điều này có thể dẫn đến độ trễ cao hơn.

Chúng ta có thể cải thiện hơn nữa hiệu suất của hệ thống bằng cách thêm vào bộ đệm để lưu trữ các tweet nổi bật ngay trước server cơ sở dữ liệu.

**Sharding dựa trên thời gian tạo Tweet**: Lưu trữ các tweet dựa trên thời gian tạo sẽ mang lại cho chúng ta lợi thế là tìm nạp tất cả các tweet hàng đầu một cách nhanh chóng và chúng ta chỉ phải truy vấn một tập hợp server rất nhỏ. Vấn đề ở đây là lưu lượng tải sẽ không được phân phối, ví dụ: trong khi viết, tất cả các tweet mới sẽ được chuyển đến một server và các server còn lại sẽ không hoạt động. Tương tự, trong khi đọc, server giữ dữ liệu mới nhất sẽ có tải rất cao so với server giữ dữ liệu cũ.

**Điều gì sẽ xảy ra nếu chúng ta có thể kết hợp sharding dựa theo TweetID với sharding dựa theo thời gian tạo Tweet?** Nếu chúng ta không lưu trữ riêng thời gian tạo tweet và sử dụng TweetID để ánh xạ điều đó, chúng ta có thể nhận về ưu điểm của cả hai phương pháp. Bằng cách này, sẽ khá nhanh chóng để tìm các Tweet mới nhất. Đối với điều này, chúng ta phải làm cho mỗi TweetID là duy nhất trong hệ thống của chúng ta và mỗi TweetID cũng phải chứa một timestamp.

Chúng ta có thể sử dụng thời gian unix cho việc này. Giả sử TweetID của chúng ta sẽ có hai phần: phần đầu tiên sẽ đại diện cho giây epoch và phần thứ hai sẽ là một chuỗi tự động tăng dần. Vì vậy, để tạo một TweetID mới, chúng ta có thể lấy thời gian unix hiện tại và thêm một số tự động tăng dần vào đó. Chúng ta có thể tìm ra số phân đoạn từ TweetID này và lưu trữ nó ở đó.

Kích thước của TweetID của chúng ta là bao nhiêu? Giả sử thời gian của chúng ta bắt đầu từ hôm nay, chúng ta cần bao nhiêu bit để lưu trữ số giây trong 50 năm tới?

> 86400 sec/day * 365 (days a year) * 50 (years) => 1.6B

![](./assets/period.png)

Ta cần 31 bit để lưu trữ con số này. Vì trung bình, chúng ta sẽ có 1150 tweet mới mỗi giây, chúng ta có thể phân bổ 17 bit để lưu trữ chuỗi tự động tăng dần; điều này sẽ làm cho TweetID của chúng ta dài 48 bit. Vì vậy, mỗi giây chúng ta có thể lưu trữ (2^17 => 130K) tweet mới. Chúng ta có thể đặt lại trình tự tăng dần tự động của mình mỗi giây. Để có khả năng chịu lỗi và hiệu suất tốt hơn, chúng ta có thể có hai server cơ sở dữ liệu để tạo các khóa tự động tăng, một máy tạo khóa số chẵn và máy còn lại tạo khóa số lẻ.

Gia sử ta có giây epoch hiện tại là "1483228800," TweetID sẽ trông như thế này:

1483228800 000001
1483228800 000002
1483228800 000003
1483228800 000004
…

Nếu chúng ta đặt TweetID dài 64-bits (8 byte), chúng ta có thể dễ dàng lưu trữ các tweet trong 100 năm tới và cũng có thể lưu trữ chúng với mức độ chi tiết mili-giây.

Trong cách tiếp cận trên, chúng ta vẫn phải truy vấn tất cả các server chủ để tạo timeline, nhưng việc đọc (và ghi) của chúng ta về cơ bản sẽ nhanh hơn đáng kể.

1. Vì chúng ta không có bất kỳ chỉ mục phụ nào (vào thời gian tạo), điều này sẽ làm giảm độ trễ ghi của chúng ta.
2. Trong khi đọc, chúng ta không cần lọc về thời gian tạo vì khóa chính của chúng ta đã bao gồm thời gian unix trong đó.

## 8. Bộ đệm

Ta có thể thêm một bộ đệm cho server cơ sở dữ liệU để lưu lại các tweet và người dùng nổi bật. Ta có thể sử dụng giải pháp off-the-shelf như Memcache để lưu trữ toàn bộ tweet. Server ứng dụng, trước khi đến cơ sở dữ liệu có thể kiểm tra nhanh nếu bộ đệm có tweet mong muốn. Dựa trên các kiểu sử dụng của client, chúng ta có thể xác định số lượng server bộ nhớ đệm mà chúng ta cần.

**Chính sách thay thế bộ đệm nào phù hợp nhất với nhu cầu của chúng ta?** Khi bộ đệm đầy và chúng ta muốn thay thế một tweet bằng một tweet mới hơn/hot hơn, chúng ta sẽ chọn như thế nào?  Thuật toán LRU (Least Recently Used) có thể là một chính sách hợp lý cho hệ thống. Theo đó, chúng ta sẽ loại bỏ tweet ít được xem gần đây nhất trước tiên.

**Làm thế nào chúng ta có thể có bộ nhớ đệm thông minh hơn?** Nếu chúng ta đi theo quy tắc 80-20, tức là 20% tweet tạo ra 80% lưu lượng đọc, có nghĩa là một số tweet nhất định phổ biến đến mức đa số mọi người đọc chúng. Điều này cho thấy rằng chúng ta có thể cố gắng lưu vào bộ nhớ cache 20% khối lượng đọc hàng ngày từ mỗi phân đoạn.

**Điều gì sẽ xảy ra nếu chúng ta lưu dữ liệu mới nhất vào bộ nhớ cache?** Dịch vụ của chúng ta có thể được hưởng lợi từ cách tiếp cận này. Giả sử nếu 80% người dùng của chúng ta chỉ xem các bài đăng trong ba ngày qua; chúng ta có thể cố gắng lưu vào bộ nhớ cache tất cả các tweet trong ba ngày qua. Giả sử chúng ta có các server bộ nhớ cache chuyên dụng lưu trữ tất cả các tweet từ tất cả người dùng trong ba ngày qua. Như ước tính ở trên, chúng ta nhận được 100 triệu tweet mới hoặc 30GB dữ liệu mới mỗi ngày (không có ảnh và video). Nếu chúng ta muốn lưu trữ tất cả các tweet từ ba ngày trước, chúng ta sẽ cần ít hơn 100GB bộ nhớ. Dữ liệu này có thể dễ dàng phù hợp với một server, nhưng chúng ta nên sao chép nó lên nhiều server để phân phối tất cả lưu lượng đọc nhằm giảm tải cho các server bộ nhớ cache. Vì vậy, bất cứ khi nào chúng ta tạo dòng thời gian của người dùng, chúng ta có thể hỏi server bộ nhớ cache xem họ có tất cả các tweet gần đây cho người dùng đó hay không. Nếu có, chúng ta chỉ cần trả lại tất cả dữ liệu từ bộ nhớ đệm. Nếu chúng ta không có đủ tweet trong bộ nhớ cache, chúng ta phải truy vấn server backend để tìm nạp dữ liệu đó. Trên một thiết kế tương tự, chúng ta có thể thử lưu vào bộ nhớ đệm ảnh và video trong ba ngày qua.

Bộ nhớ cache của chúng ta sẽ giống như một bảng băm trong đó "key" sẽ là "OwnerID" và "value" sẽ là một danh sách được liên kết kép chứa tất cả các tweet từ người dùng đó trong ba ngày qua. Vì chúng ta muốn truy xuất dữ liệu gần đây nhất trước tiên, chúng ta luôn có thể chèn các tweet mới vào đầu danh sách được liên kết, có nghĩa là tất cả các tweet cũ hơn sẽ ở gần đuôi của danh sách được liên kết. Do đó, chúng ta có thể loại bỏ các tweet ở phần đuôi để dành khoảng trống cho các tweet mới hơn.

![](./assets/cache.png)

## 9. Tạo Timeline

Để có cuộc thảo luận chi tiết về việc tạo timeline, hãy xem Thiết kế Newsfeed của Facebook.

## 10. Sao lưu và khả năng chịu lỗi

Vì hệ thống của chúng ta phục vụ việc đọc nhiều, chúng ta có thể có nhiều server cơ sở dữ liệu thứ cấp cho mỗi phân vùng DB. Server thứ cấp sẽ chỉ được sử dụng cho các lưu lượng đọc. Tất cả các yêu cầu ghi đầu tiên sẽ được chuyển đến server chính và sau đó sẽ được sao chép sang các server thứ cấp. Lược đồ này cũng sẽ cung cấp cho chúng ta khả năng chịu lỗi, vì bất cứ khi nào server chính gặp sự cố, chúng ta có thể chuyển đổi dự phòng sang các server phụ.

## 11. Cân bằng tải

Chúng ta có thể thêm lớp cân bằng tải tại ba vị trí trong hệ thống của mình
1. Giữa client và server ứng dụng
2. Giữa server ứng dụng và server nhân rộng cơ sở dữ liệu
3. Giữa server Tổng hợp và server bộ đệm.

Ban đầu, cách tiếp cận Round Robin đơn giản có thể được áp dụng; phân phối các yêu cầu đến một cách đồng đều giữa các server. Cân bằng tải này rất đơn giản để thực hiện và không có thêm bất kỳ chi phí nào. Một lợi ích khác của phương pháp này là nếu một server bị chết, cân bằng tải sẽ đưa nó ra khỏi vòng quay và sẽ ngừng gửi bất kỳ lưu lượng nào đến nó. Một vấn đề với Round Robin là nó sẽ không tính đến việc tải các server. Nếu một server bị quá tải hoặc chậm, cân bằng tải sẽ không ngừng gửi các yêu cầu mới đến server đó. Để xử lý điều này, một giải pháp cân bằng tải thông minh hơn có thể được đặt để truy vấn định kỳ server backend về tải của chúng và điều chỉnh lưu lượng dựa trên đó.

## 12. Giám sát

Việc giám sát hệ thống của chúng ta là rất quan trọng. Chúng ta nên liên tục thu thập dữ liệu để có được cái nhìn đúng đắn ngay lập tức về cách hệ thống của chúng ta đang hoạt động. Chúng ta có thể thu thập các chỉ số sau để hiểu về hiệu suất dịch vụ của mình:

1. Số lượng tweet mới mỗi ngày/giây, cao nhất hàng ngày là bao nhiêu?
2. Số liệu thống kê về thời gian phân phối, bao nhiêu tweet mỗi ngày/giây mà dịch vụ của chúng ta đang phân phối.
3. Độ trễ trung bình mà người dùng nhìn thấy để làm mới timeline.

Bằng cách theo dõi các chỉ số này, chúng ta sẽ nhận ra khi nào chúng ta cần thêm bản sao, cân bằng tải hoặc bộ nhớ đệm.

## 13. Yêu cầu mở rộng

**Chúng ta cung cấp feeds như thế nào?** Nhận tất cả các tweet mới nhất từ ​​những người mà ai đó theo dõi và sắp xếp chúng theo thời gian. Sử dụng phân trang để tìm nạp/hiển thị các tweet. Chỉ tìm nạp `N` tweet hàng đầu từ tất cả những người mà ai đó theo dõi. `N` này sẽ phụ thuộc vào Chế độ xem của phía client, vì trên thiết bị di động, chúng ta hiển thị ít tweet hơn so với ứng dụng web. Chúng ta cũng có thể lưu vào bộ đệm các tweet hàng đầu tiếp theo để tăng tốc độ.

Ngoài ra, chúng ta có thể tạo trước feed để cải thiện hiệu quả; để biết chi tiết, vui lòng xem 'Tạo timeline' trong Thiết kế Instagram.

**Retweet**: Với mỗi đối tượng Tweet trong cơ sở dữ liệu, chúng ta có thể lưu trữ ID của Tweet gốc và không lưu trữ bất kỳ nội dung nào trên đối tượng retweet này.

**Chủ đề thịnh hành**: Chúng ta có thể lưu vào bộ nhớ cache các thẻ bắt đầu bằng # hoặc các truy vấn tìm kiếm thường xuyên xuất hiện nhất trong N giây qua và tiếp tục cập nhật chúng sau M giây một lần. Chúng ta có thể xếp hạng các chủ đề thịnh hành dựa trên tần suất tweet hoặc truy vấn tìm kiếm hoặc lượt retweet hoặc lượt thích. Chúng ta có thể có nhiều lựa chọn hơn cho các chủ đề được hiển thị cho nhiều người hơn.

**Ai nên theo dõi? Làm thế nào để đưa ra đề xuất?** Tính năng này sẽ cải thiện mức độ tương tác của người dùng. Chúng ta có thể đề xuất bạn bè của những người mà ai đó theo dõi. Chúng ta có thể đi xuống hai hoặc ba cấp độ để tìm những người nổi tiếng cho các đề xuất. Chúng ta có thể ưu tiên những người có nhiều người theo dõi hơn.

Vì chỉ có thể đưa ra một số đề xuất bất cứ lúc nào, hãy sử dụng Máy học (ML) để xáo trộn và sắp xếp lại mức độ ưu tiên. Tín hiệu ML có thể bao gồm những người có lượt theo dõi tăng gần đây, những người theo dõi phổ biến nếu người kia đang theo dõi người dùng này, vị trí hoặc sở thích chung,...

**Moments**: Nhận tin tức hàng đầu cho các trang web khác nhau trong 1 hoặc 2 giờ qua, tìm ra các tweet có liên quan, ưu tiên chúng, phân loại chúng (tin tức, hỗ trợ, tài chính, giải trí,...) bằng ML - Máy giám sát học hoặc Clustering. Sau đó, chúng ta có thể hiển thị các bài viết này dưới dạng chủ đề thịnh hành trong Moments.

**Tìm kiếm**: Tìm kiếm liên quan đến việc lập chỉ mục, xếp hạng và truy xuất các tweet. Ta sẽ thảo luận ở một bài viết sâu hơn.