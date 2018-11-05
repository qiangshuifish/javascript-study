let koa = require('koa');
let auth = require('basic-auth');
const router = require('koa-router')();

const app = new koa();

// 响应客户端
app.use(router.routes())
  .use(router.allowedMethods());

router.use(async (ctx,next) => {
  let credentials = auth(ctx.req);
  if(!credentials || credentials.name !== 'root' || credentials.pass !== 'root'){
    authFailed(ctx.res);
  }else{
    next();
  }
});

router.get('/',function (ctx) {
  ctx.body = "通过验证"
})

let port = 3000;
app.listen(port);
console.log(`start with ${port}`)


function authFailed(res) {
  res.statusCode = 401
  res.setHeader('WWW-Authenticate', 'Basic')
  res.end('Access denied')
}