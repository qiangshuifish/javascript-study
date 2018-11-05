const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

// 记录日志
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    ctx.set('X-Response-Time', `${Date.now() - start}ms`);
    console.log(`${ctx.method} ${ctx.url} - ${Date.now() - start}ms`)
});



// 响应客户端
app.use(router.routes())
    .use(router.allowedMethods());


router.get('/', function (ctx) {
    ctx.body = "I am Index Page";
});

router.get('/hello', function (ctx) {
    ctx.body = "hello world";
});


let port = 3000;
app.listen(port);
console.log(`start with ${port} pid: ${process.pid}`)



