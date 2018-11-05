var express = require('express');
var app = express(); // the main app
var admin = express(); // the sub app
admin.get('/', function(req, res) {
    res.send(`sub app 挂载路径 ${admin.mountpath}`);
});
app.get("/",function (req, res) {
    res.send("main app")
})
app.use('/admin', admin); // mount the sub app

app.listen(3000);
admin.listen(3001);
console.log("start");


//test
const fetch = require('node-fetch');
fetch('http://localhost:3000/', {method: 'get'})
    .then(res => res.text())
    .then(body => console.log(body));//main app
fetch('http://localhost:3001/', {method: 'get'})
    .then(res => res.text())
    .then(body => console.log(body));////main app
fetch('http://localhost:3000/admin', {method: 'get'})
    .then(res => res.text())
    .then(body => console.log(body));////main app