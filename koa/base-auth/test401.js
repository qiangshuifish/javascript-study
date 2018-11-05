let Koa = require('koa');
let app = new Koa();

app.use(async (ctx, next) => {
  ctx.status = 401;
  ctx.set('WWW-Authenticate', 'Basic')
});


app.listen(3000)