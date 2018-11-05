const childProcess = require('child_process');

let worker = childProcess.fork('worker-send.js',['worker']);
worker.on('close',function (code) {
    console.log(`${new Date().getTime()} 子进程已经退出： ${code}`)
});

worker.on('message', function(m){
    console.log(`${new Date().getTime()} message from worker: ${JSON.stringify(m)}`);
});

worker.send({from: 'master'},function () {
    console.log(`${new Date().getTime()} master send 的 callback`)
});

console.log(`${new Date().getTime()} master中worker pid ${worker.pid}`)

console.log(`${new Date().getTime()} master pid ${process.pid}`)






