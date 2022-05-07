# Định lý CAP

Trong quá trình phát triển sự nghiệp với tư cách là một lập trình viên, bạn sẽ gặp phải nhiều yêu cầu hơn về thiết kế hệ thống. Đặc biệt là các kiến thức thiết kế hệ thống sao cho hiệu quả và cân bằng trên quy mô lớn. Thiết kế hệ thống là một lĩnh vực rộng và nhiều khái niệm quan trọng. Một trong số đó là định lý CAP. Hiểu định lý CAP là chìa khoá cho các hệ thống phân tán mạnh mẽ. Ở bài viết này ta sẽ đi sâu vào định lý CAP, giải thích ý nghĩa và các thành phần của nó.

## Định lý CAP là gì?

Định lý CAP, hay định lý Brewer, là một định lý cơ bản trong lĩnh vực thiết kế hệ thống. Nó được giới thiệu lần đầu tiên vào năm 2000 bởi Eric Brewer, một giáo sư khoa học máy tính tại U.C. Berkeley, trong một buổi diễn thuyết về các nguyên tắc của hệ thống phân tán. Năm 2002, các giáo sư Nancy Lynch và Seth Gilbert của MIT đã công bố một bằng chứng về Brewer’s Conjecture. Định lý CAP phát biểu rằng **"Một hệ thống phân tán chỉ có thể cung cấp đồng thời hai trong ba thuộc tính: tính nhất quán, tính khả dụng và dung sai phân vùng"**. Định lý đưa ra sự cân bằng giữa tính nhất quán và tính khả dụng khi có một phân vùng.

Hệ thống phân tán là một tập hợp các máy tính hoạt động cùng nhau để tạo thành một máy tính duy nhất cho người dùng cuối. Tất cả các máy được phân phối đều có một trạng thái dùng chung và hoạt động đồng thời. Với hệ thống phân tán, người dùng có thể giao tiếp với bất kỳ máy nào được phân phối mà không cần biết đó là máy duy nhất. Mạng hệ thống phân tán lưu trữ dữ liệu của nó trên không chỉ một máy đơn lẻ, mà sử dụng nhiều máy vật lý hoặc máy ảo cùng một lúc.

## Chứng minh định lý CAP

