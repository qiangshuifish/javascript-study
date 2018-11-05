const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fs = require("fs");
const app = express();
const options = {
    extensions: ['htm', 'html'],//设置文件扩展名备份选项
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//静态文件
app.use(express.static('../../../public/static',options));

//使用 multer 处理文件上传
app.post("/upload",upload.single('file'),function (req, rsp) {
    console.log(req.file)
    console.log('========接收文件成功========')
    let file = req.file;
    fs.writeFile(file.originalname,file.buffer,function (err) {
        if(err){
            rsp.send("文件写入失败")
        }else {
            rsp.send("文件写入成功")
        }
    })
});

//处理 body 参数
app.post('/param',function (req, rsp) {
    console.log(req.body)
    rsp.send(req.body)
});

//处理 url 参数
app.get('/param',function (req, rsp) {
    console.log(req.query)
    rsp.send(req.query)
});


let port = 3000;
app.listen(port);
console.log(`start with ${port}`)