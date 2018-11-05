let express = require("express");
const app = express();
const Morgan = require('morgan');

let morgan = Morgan('dev');
// let morgan = Morgan(':method :url :status :res[content-length] - :response-time ms');
/*
let morgan = Morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
});
*/



app.use(morgan);

app.get('/*',function (req, rsp) {
    rsp.send(req.url)
})



let port = 3000;
app.listen(port);
console.log(`start with ${port}`)