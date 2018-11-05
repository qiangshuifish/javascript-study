let express = require("express");
const app = express();
const Morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');


let morgan = Morgan('dev');
app.use(morgan);
// 使用 session 中间件
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));
// 使用 bodyParser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 自定义登录拦截中间件
app.use('/needLogin/*', function (req, rsp, next) {
    console.log(req.session)
    if (!req.session.username) {
        rsp.redirect('../login');
    } else {
        rsp.send(`当前登录用户: ${req.session.username}`);
    }
    next();
});
// 使用 static 中间件
const options = {
    extensions: ['htm', 'html'],
};
app.use(express.static('../../../public/static',options));



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