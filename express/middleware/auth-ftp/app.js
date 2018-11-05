const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fs = require("fs");
const serveIndex = require('../server-index/index')
const ejs = require('ejs')
let basicauth = require('basicauth-middleware');


const app = express();
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', './');

const options = {
    extensions: ['htm', 'html'],//设置文件扩展名备份选项
    'icons': true
};

app.use(basicauth(function (username, password,callback) {
    if(username === 'root' && password === '1234'){
        callback(null,true);
    }else {
        callback(null,false);
    }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//静态文件
app.use('/ftp', express.static('../../../'), serveIndex('../../../', {'icons': true}))
app.get('/upload',function (req, rsp) {
    rsp.render("upload")
})
//使用 multer 处理文件上传
app.post("/upload.do",upload.single('file'),function (req, rsp) {
    console.log('========接收文件成功========')
    let file = req.file;
    mkdirsSync(req.body.path);
    let path = `${req.body.path}/${file.originalname}`;
    fs.writeFile(path,file.buffer,function (err) {
        if(err){
            rsp.send("文件写入失败")
        }else {
            rsp.send(`文件写入成功,路径：${path}`)
        }
    })
});



let port = 3000;
app.listen(port);
console.log(`start with ${port}`);



/**
 * 递归创建目录 异步方法
 * @param dirname
 * @param callback
 */
function mkdirsSync(dirpath, mode) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        console.error("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
}