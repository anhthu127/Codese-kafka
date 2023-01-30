const { io } = require("socket.io-client");
// 'wss://d2be-58-187-249-46.ap.ngrok.io'
const socket = io();

socket.on('stockPrice', (data) => {
    // const sql = `update stockPrice set askPrice1=? where code=?`
    // await execSql(sql,[data.askPrice1,data.code]) // 260ms
    // giả sử tốn 2s để xử lý, và chiếm 10% CPU
    // vd: trong 1s có 20 bản ghi bắn về cùng 1 lúc => 

    // publishKafka(data) // 2ms
    console.log(1231231);
})


// server - client
// không kiểm soát được tài nguyên của các service (CPU, Connection DB,...)
// không đảm bảo về thứ tự chính xác của dữ liệu 
