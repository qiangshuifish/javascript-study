const express = require('express');
const app = express();

const middleware = function (req,res,next) {
    console.log()
    console.log("********我是全局请求拦截器********")
    console.log(`* req.url: ${req.url}`)
    console.log("***************************")
    console.log()
    next();
}

const middleware2 = function (req,res,next) {

    console.log("********我是home请求拦截器********")
    console.log(`* req.url: ${req.url}`)
    console.log("***************************")

    res.send("middleware2")
    next();
}

const hello = function (req,res,next) {
    res.write("hello ")
    next();
}

const world = function (req,res,next) {
    res.write("world")
    next();
}

app.use(middleware)
app.get('/index',function (req, res) {
    console.log("index")
    res.send("index");
});



app.use('/home',middleware2);

app.get("/hello",[hello,world],function (req, res) {
    res.end("!");
})



let port = 3000;
app.listen(port);
console.log(`start with ${port}`);