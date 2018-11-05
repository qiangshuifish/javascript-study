var express    = require('express')
var serveIndex = require('serve-index')

var app = express()
app.use('/ftp', express.static('../../../'), serveIndex('../../../', {'icons': true}))

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)