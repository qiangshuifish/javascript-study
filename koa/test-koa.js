const Koa = require('koa');
const app = new Koa();

// 记录日志
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    ctx.set('X-Response-Time', `${Date.now() - start}ms`);
    console.log(`${ctx.method} ${ctx.url} - ${Date.now() - start}ms`)
});

// 响应客户端
app.use(async ctx => {
    ctx.body = 'Hello World';
});

let port = 3000;
app.listen(port);
console.log(`start with ${port} pid: ${process.pid}`)



