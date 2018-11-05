/**
 * Module dependencies.
 */

const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');
const auth = require('koa-basic-auth');
const router = require('koa-router')();
// log requests

app.use(logger());
app.use(koaBody({ multipart: true }));
// 响应客户端

app.use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.join(__dirname, '../../public/static/')));

router.get('/', async function (ctx,next) {
  await next();
  ctx.body = "I am Index Page";
});

router.get('/hello',async function (ctx) {
  await next();
  ctx.body = "hello world";
});

router.post("/upload",async function (ctx) {
  await next();
  const file = ctx.request.body.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
});


app.listen(3000);
console.log('listening on port 3000');