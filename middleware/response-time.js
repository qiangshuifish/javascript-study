let Koa = require('koa');
let Express = require('express');



let express = Express();
let koa = new Koa();





express.listen(3000);
koa.listen(3001);

express.use(async function(req, res, next) {
  let start = new Date;

  await next();

  let ms = new Date - start;
  res.write(`'X-Response-Time', ${ms} + 'ms'`)
  res.end();
});

express.use(async function(req, res, next) {
  res.write("hello world 1 \n")
  res.write("hello world 2 \n")
  await next()
});


koa.use(async(ctx,next) => {
  let start = new Date;

  await next();

  let ms = new Date - start;
  ctx.set('X-Response-Time', ms + 'ms');
});

koa.use(async(ctx,next) => {
  ctx.body = "hello world 1 \n";
  ctx.body =ctx.body+ "hello world 2 \n";
  next();
});