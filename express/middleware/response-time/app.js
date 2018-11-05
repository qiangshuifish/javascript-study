let express = require("express");
const responseTime = require('response-time')

const app = express();
app.use(responseTime())




app.get('/*',function (req, rsp) {
    rsp.send(req.url)
})



let port = 3000;
app.listen(port);
console.log(`start with ${port}`)