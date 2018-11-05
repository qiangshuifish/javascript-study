const Koa = require('koa');
const serveIndex = require('koa2-serve-index');
const app = new Koa();

app.use(serveIndex("../../", {'icons': true}));

let port = 3000;
app.listen(port);
console.log(`start with ${port} pid: ${process.pid}`)