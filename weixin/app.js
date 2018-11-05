const express = require('express');
const session = require('express-session');
const weixin = require('weixin-api');
const app = express();
const bodyParser = require('body-parser');
const Morgan = require('morgan');
// 解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));

let morgan = Morgan(':method :url :status :res[content-length] - :response-time ms');
app.use(morgan);

// config
weixin.token = '123456';

// 接入验证
app.get('/', function (req, res) {

    // 签名成功
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

// 监听文本消息
weixin.textMsg(function (msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "文本" :
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "这是文本回复",
                funcFlag: 0
            };
            break;

        case "音乐" :
            // 返回音乐消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "music",
                title: "音乐标题",
                description: "音乐描述",
                musicUrl: "音乐url",
                HQMusicUrl: "高质量音乐url",
                funcFlag: 0
            };
            break;

        case "图文" :
            // 返回图文消息
            var articles = [];
            articles[0] = {
                title: "PHP依赖管理工具Composer入门",
                description: "PHP依赖管理工具Composer入门",
                picUrl: "http://c.hiphotos.baidu.com/image/h%3D300/sign=5975ff04f41986185e47e9847aec2e69/7acb0a46f21fbe09810db97167600c338744ad00.jpg",
                url: "https://www.qiangshuidiyu.xin/"
            };

            articles[1] = {
                title: "八月西湖",
                description: "八月西湖",
                picUrl: "http://c.hiphotos.baidu.com/image/h%3D300/sign=5975ff04f41986185e47e9847aec2e69/7acb0a46f21fbe09810db97167600c338744ad00.jpg",
                url: "https://www.qiangshuidiyu.xin/"
            };

            articles[2] = {
                title: "「翻译」Redis协议",
                description: "「翻译」Redis协议",
                picUrl: "http://c.hiphotos.baidu.com/image/h%3D300/sign=5975ff04f41986185e47e9847aec2e69/7acb0a46f21fbe09810db97167600c338744ad00.jpg",
                url: "https://www.qiangshuidiyu.xin/"
            };

            // 返回图文消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "news",
                articles: articles,
                funcFlag: 0
            }
    }

    weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function (msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听语音消息
/*
weixin.voiceMsg(function (msg) {
    console.log("voiceMsg received");
    console.log(JSON.stringify(msg));
});
*/

// 监听位置消息
weixin.locationMsg(function (msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function (msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function (msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
app.post('/', function (req, res) {

    // loop
    weixin.loop(req, res);

});

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)