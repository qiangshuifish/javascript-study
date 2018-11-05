var express = require('express')
const fs = require("fs")
var app = express()

app.use(express.limit())

app.get("/limit", function (req, rsp) {
    rsp.send("");
});

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)