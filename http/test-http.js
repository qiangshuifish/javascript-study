const http = require("http");

let app = http.createServer();


app.on('request',function (req, res) {
    res.end("hello world !");
    process.abort();
});




let port = 3000;
app.listen(port,function () {
    let memoryUsage = process.memoryUsage();
    console.log(`node程序消耗内存：${(memoryUsage.rss)/1024/1024} MB`)
    console.log(`V8 分配内存：${memoryUsage.heapTotal/1024/1024} MB`)
    console.log(`V8 消耗内存：${memoryUsage.heapUsed/1024/1024} MB`)
});
console.log(`start with ${port}`);
console.log(`pid ${process.pid}`)
