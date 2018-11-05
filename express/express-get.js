var express = require("express");
const app = express();
let port = 3000;
app.listen(port);

//  路由
app.get('/index',function (req, res) {
    console.log("")
    res.send("index");
});

//rest 参数
app.get('/param/:id/:name',function (req, rsp) {
    console.log(req.params)
    rsp.send(req.params)
});

//rest 通配符参数
app.get('/wildcard/param/:id?/:name?',function (req, rsp) {
    console.log(req.params)
    rsp.send(`通配符参数 ${JSON.stringify(req.params)}`)
});
//正则匹配路由
app.get('/regex/[1-9]{1,4}/[a-z]{1,20}',function (req, rsp) {
    console.log(req.url)
    rsp.send(`通配符参数 ${JSON.stringify(req.url)}`)
});

//正则匹配rest 参数
app.get('/regex/param/:id([1-9]{1,4})/:name([a-z]{1,20})',function (req, rsp) {
    console.log(req.params)
    rsp.send(`正则参数 ${JSON.stringify(req.params)}`)
});



console.log(`start with ${port}`);
