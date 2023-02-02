- message trong partition được quản lý dựa trên group consumer và offset message, khi commit message thì message không
  mất đi khỏi partition mà nó chỉ đánh dấu kiểu message có địa chỉ là bao nhiêu của group id nào đã được consume
- 1 topic có n partition
- 1 group consumer chỉ consume n partition
- 1 partition được consume bởi 1 consumer thuộc 1 group hoặc nhiều consumer thuộc nhiều group
- Message key để phân biệt các partition với nhau, các message có cùng message key thì sẽ thuộc cùng 1 partition.
  Nó cũng dùng để phân biệt xem sẽ producing và consuming ở partition nào
