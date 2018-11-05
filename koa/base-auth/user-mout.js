const mount = require('koa-mount');
const Koa = require('koa');
const auth = require('koa-basic-auth');

async function hello(ctx, next){
  await next();
  ctx.body = 'Hello';
}

async function world(ctx, next){
  await next();
  ctx.body = 'World';
}

const app = new Koa();


app.use(mount('/hello', hello));
app.use(mount('/world', world));

app.use(mount(auth({ name: 'tj', pass: 'tobi' })));



app.listen(3000);
console.log('listening on port 3000');