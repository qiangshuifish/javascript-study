console.log(`${new Date().getTime()} 进程 ${process.argv[2]} 执行`)
process.on('message', function(m){
    console.log(`${new Date().getTime()} message from master: + ${JSON.stringify(m)} `);
    process.exit();
});

process.send({from: 'worker'},function () {
    console.log(`${new Date().getTime()} worker send 的 callback`)
});
console.log(`${new Date().getTime()} worker pid ${process.pid}` )