const Koa = require('koa');
const auth = require('koa-basic-auth');
const mount = require('koa-mount');
const app = module.exports = new Koa();


app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});


app.use(mount('/', auth({ name: 'tobi', pass: 'ferret' })));

app.use(mount("/hello",async(ctx,next) => {
  ctx.body = 'hello';
  await next();
}))

app.use(async function(ctx) {
  ctx.body = 'secret';
});

let port = 3000;
if (!module.parent) app.listen(port);
console.log(`start with ${port}`);