let express = require("express");
const Morgan = require('morgan');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

// logger
let morgan = Morgan('dev');
app.use(morgan)

// 静态文件
const options = {
    extensions: ['htm', 'html'],
};
app.use(express.static('../../../public/static',options));

// 使用 bodyParser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 使用 session 中间件
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));

//路由中间件
let router = express.Router();
router.use(function(req, res, next) {
    console.log(req.url)
    next();
});
router.get("/success",function (req, rsp) {
    rsp.end(`登录成功 ${req.url}<br> 当前登录用户： ${req.session.username}`)
});
router.get("/failure",function (req, rsp) {
    rsp.end(`登录失败 ${req.url}`)
});
app.use('/needLogin',router)


app.get("/needLogin/longinSucess",function (req, rsp) {
    if (!req.session.username) {
        rsp.redirect('../needLogin/failure');
    } else {
        rsp.redirect('../needLogin/success');
    }
})

app.post('/login', function (req, rsp) {
    let body = req.body;
    let session = req.session;
    session.username = body.username;
    session.password = body.password;
    rsp.redirect('../loginSuccess.html')
});


let port = 3000;
app.listen(port);
console.log(`start with ${port}`)