let express = require('express');
let basicauth = require('basicauth-middleware');
const app = express();

app.use(basicauth(function (username, password,callback) {
    if(username === 'root' && password === 'root'){
        callback(null,true);
    }else {
        callback(null,false);
    }
}));

app.get('/',function (req, rsp) {
    rsp.send("通过验证");
})

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)

