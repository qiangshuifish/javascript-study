

/*//查看Bucket列表
co(function* () {
    var result = yield client.listBuckets();
    console.log(result);
}).catch(function (err) {
    console.log(err);
});

//查看文件列表
co(function* () {
    client.useBucket('liugong');
    var result = yield client.list({
        'max-keys': 5
    });
    console.log(result);
}).catch(function (err) {
    console.log(err);
});*/

//上传一个文件
function *upload(stream) {
    // use 'chunked encoding'
    client.useBucket('liugong');
    var result = yield client.putStream('tupian1.jpg', stream);
    console.log(result);
    // don't use 'chunked encoding'
    /* var stream = fs.createReadStream('local-file');
     var size = fs.statSync('local-file').size;
     var result = yield client.putStream('object-key', stream, {contentLength: size});
     console.log(result);*/
}
var stream = fs.createReadStream('tupian.jpg');
co(upload(stream)).catch(function (err) {
    console.log(err);
});