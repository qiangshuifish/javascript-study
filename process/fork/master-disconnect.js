const childProcess = require('child_process');

let worker = childProcess.fork('worker-disconnect.js',['worker']);
worker.on('close',function (code) {
    console.log(`${new Date().getTime()} 子进程已经退出： ${code}`)
});

worker.on('disconnect', function(m){
    console.log(`${new Date().getTime()} disconnect with worker`);
});


console.log(`${new Date().getTime()} master中worker pid ${worker.pid}`)
console.log(`${new Date().getTime()} master pid ${process.pid}`)

//断开连接 和在worker中断开作用差不多
// worker.disconnect();



