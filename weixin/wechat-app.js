const WechatAPI = require('wechat-api');
const fs = require('fs');

/*const wechatAPI = new WechatAPI('wx409941bdfc65e704', 'd4624c36b6795d1d99dcf0547af5443d', function (callback) {
  // 传入一个获取全局token的方法
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

wechatAPI.sendText('orUlWs121xleehk1_c1RrqRtWBJQ','Hello world',function (err, result) {
  console.log(result)
});*/


var api = new WechatAPI('wx409941bdfc65e704', 'd4624c36b6795d1d99dcf0547af5443d');


api.massSend({
  "image":{
    "media_id":"123dsdajkasd231jhksad"
  },
  "msgtype":"image"
}, 'orUlWs121xleehk1_c1RrqRtWBJQ', function (err, result) {

});



