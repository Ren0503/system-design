# Caching

![](./assets/caching-system-design-interview-concept-cover.svg)

Trong bài viết này, ta sẽ tìm hiểu về kỹ thuật Caching, một khái niệm cốt lõi rất quan trọng trong thiết kế hệ thống. Bạn có thể nhớ lại mỗi khi mở một trang web nào đó, lần đầu tiên sẽ rất lâu nhưng những lần sau đó sẽ ít tốn thời gian hơn để tải. Tại sao lại như vậy? Hãy cùng tìm hiểu!

## Caching có nghĩa là gì?

Caching, tạm dịch là "đệm", là quá trình lưu trữ lại kết quả của  yêu cầu ở một vị trí khác vị trí ban đầu, hay lưu ở một bộ lưu trữ tạm thời để tránh thực hiện lại cùng hành động. Nói đơn giản hơn, cache (bộ nhớ đệm) là một vùng nhớ tạm thời cho lưu trữ các file và dữ liệu ở một vị trí mới để có thể truy cập chúng nhanh hơn.

![](./assets/what-do-you-mean-by-caching.png)

## Ví dụ

- Trình duyệt Web lưu trữ các file HTML, CSS, JS, và ảnh vào bộ nhớ đệm để các lần truy cập lại website nhanh hơn.
- CDNs lưu trữ tất cả file tĩnh để giúp giảm độ trễ.
- DNS được dùng để lấy địa chỉ IP từ một truy vấn. Thế nên, với cùng một yêu cầu địa chỉ IP nhiều lần, nó có thể lưu vào bộ nhớ đệm, cho phép chúng ta thực hiện truy vấn lại DNS nhiều lần, và các trang web sẽ được truy cập nhanh hơn.

## Liên hệ thực tế

Ta có một ví dụ thực tế tương đồng như sau. Một thư viện với hơn 1000 quyển sách và chỉ có một thủ thư ngồi tại một góc phòng, đảm nhận nhiệm vụ lấy quyển sách mà bạn mong muốn từ thư viện. Đầu tiên, ta xét trường hợp người thủ thư không dùng bộ nhớ đệm.

Khách hàng đầu tiên xuất hiện. Anh ấy hỏi về một quyển sách, ví dụ như quyển sách A. Thủ thư đi đến phòng lưu trữ, tìm quyển sách ấy và trở về lại bàn, giao quyển sách ấy cho khách hàng. Sau vài ngày, khách hàng đó trả sách, người thủ thư mang quyển sách đặt lại nơi của nó và đợi khách hàng kế tiếp. Bây giờ, nếu người khách hàng kế tiếp lại đến và hỏi mượn đúng quyển sách A. Thủ thư lại phải đến cùng một nơi, lấy sách và đưa cho khách hàng. Trong hệ thống này, người thủ thư phải đến phòng lưu trữ mỗi khi có một khách hàng đến - và thực hiện yêu cầu lấy sách một cách thường xuyên.

![](./assets/real-world-analogy-of-caching.png)

Bây giờ, ta giả sử cho người thủ thư một các cặp có thể đựng tối đa 15 quyển sách (chiếc cặp này là bộ nhớ đệm). Trong cặp này, người thủ thư sẽ giữ lại những quyển sách vừa mới được trả. Bây giờ nếu người khách hàng đầu tiên đến và yêu cầu quyển sách A, thủ thư sẽ đến phòng lưu trữ và lấy nó cho khách hàng tương tự ở trên. Nhưng những lần sau, khi khách hàng trả sách lúc này thay vì trả lại phòng lưu trữ, người thủ thư giữ lại nó ở chiếc cặp của họ. Khi một khách hàng khác đến và yêu cầu cùng quyển sách A, thủ thư có thể kiểm tra nó có trong cặp không, nếu có thì có thể đưa nó cho khách hàng ngay lập tức. Điều này đồng nghĩa thủ thư không cần đi một vòng lớn đến phòng lưu trữ, và người khách hàng cũng sẽ được phục vụ tốt hơn.

## Triển khai bộ nhớ đẹm đơn giản với Node.js

Triển khai hệ thống đơn giản:

Đầu tiên ta tạo một server đơn giản với một cơ sở dữ liệu. Ta sẽ sử dụng cơ sở dữ liệu để lấy trang html và server sẽ triển khai trang này cục bộ. Ta sẽ tạo hai endpoint, một cái dùng cache và một cái không.


```js
const express = require('express');

const app = express();

// define cache
const cache = {};

const database = {
    // we will be using this database to get this html page
    ['index.html']: '<html>Node.js Implementation of Caching!</html>',
};

get Database = (key, callback) => {
    // what this does is after 3000 miliseconds, call the database[key] 
    setTimeout(() => {
        callback(database[key])
    }, 3000);
}

// There are two end points defined

// This does not use the cache
app.get('/nocache/index.html', (req, res) => {
    // all it does is, it calls the database
    // to get the html page the page just send the page
    // and once it gets the page just send the page
    getDatabase('index.html', page => {
        res.send(page)
    });
});

// This uses the cache
app.get('/withcache/index.html', (req, res) => {
    // In this we check if the page is in the cache
    // and if it is we skip going to the database
    if('index.html' in cache) {
        res.send(cache['index.html']);
        return;
    }

    // Otherwise we make a call to the database
    // and cache the page
    // then we return the response of the page
    getDatabase('index.html', page => {
        cache['index.html'] = page;
        res.send(page);
    });
});
```

Nếu ta xem trên trình duyệt với đường dẫn là `no-cache`, nó sẽ mất 3s để tải (vì ta sử dụng setTimeout để tải trang khi không có bộ đệm là 3s). Nếu bạn tải trang này lại lần nữa, nó vẫn sẽ mất 3s để tải trang vì với mỗi lần ta tải lại, nó phải đến cơ sở dữ liệu để tìm nạp. Bây giờ, ta chuyển sang đường dẫn `cache`, ở lần đầu tiên truy cập nó cũng sẽ mất 3s để tải trang vì lúc này bộ đệm đang trống và phải đến cơ sở dữ liệu để nạp dữ liệu. Nhưng, ở những lần sau trang sẽ được tải lại ngay lập tức. Ngay khi trang được tải lần đầu, ta đã lưu kết quả vào bộ đệm cho các lần truy cập trong tương lai.

### Chính sách xoá bộ đệm

Ta cần xoá bỏ những mục tồn tại khi bộ đệm quá đầy để có không gian cho các phần tử mới thêm vào. Thực tế, có rất nhiều phương thức phổ biến để xoá các đối tượng ít được sử dụng. Các giải pháp để tối ưu hoá xác suất 
