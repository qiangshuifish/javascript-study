const childProcess = require('child_process');

function exec(i) {
    let workerProcess = childProcess.exec('node support.js ' + i, function (err, stdout, stderr) {
        if (err) {
            console.trace(err)
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    workerProcess.on('exit', function (code) {
        console.log(`子进程已经退出： ${code}`)
    })
};

function spawn(i) {
    let workerProcess = childProcess.spawn('node',['support.js',i]);

    workerProcess.stdout.on('data',function (data) {
        console.log(`stdout：${data}`)
    });

    workerProcess.stderr.on('data',function (data) {
        console.log(`stderr：${data}`)
    });

    workerProcess.on('close',function (code) {
        console.log(`子进程已经退出： ${code}`)
    })

}

function fork(i) {
    let workerProcess = childProcess.fork('support.js',[i]);
    workerProcess.on('close',function (code) {
        console.log(`子进程已经退出： ${code}`)
    });

    workerProcess.send(`fork${i}线程发送消息`);

    workerProcess.on('message', function(m){
        console.log('message from child: ' + JSON.stringify(m));
    });

    workerProcess.send({from: 'parent'});

    console.log(`workerProcess pid ${workerProcess.pid}`)

}

console.log(`master pid ${process.pid}`)

for (let i = 0; i < 1; i++) {
    // exec(i);
    // spawn(i);
    fork(i);
}





