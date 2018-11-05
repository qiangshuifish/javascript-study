var express    = require('express')
var app = express()


app.get("/err/*",function (req,rsp) {
    rsp.send((10/0));
});

// 单个使用
app.use('/err/single/**',function(err, req, res, next) {
    console.log("err/single")
    console.error(err.stack);
    res.status(500).send(`err/single ${err.message}`);
});

// err 中间件需要放在最后边
app.use('/err/many/**',function(err, req, res, next) {
    console.error(err.stack);
    next(err);
});

app.use('/err/many/**',function(err, req, res, next) {
    res.status(500).send(`err/many ${err.message}`);
});

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)