var express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

//静态文件
const options = {
    extensions: ['htm', 'html'],//设置文件扩展名备份选项
};
app.use(express.static('../../../public/static',options));
app.use(cookieParser());
app.post('/cookies',function (req, rsp) {
    console.log("=====================")
    rsp.send(req.cookies)
})


let port = 3000;
app.listen(port);
console.log(`start with ${port}`);


