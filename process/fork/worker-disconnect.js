console.log(`${new Date().getTime()} 进程 ${process.argv[2]} 执行`)
process.on('disconnect', function(m){
    console.log(`${new Date().getTime()} disconnect with master`);
    process.exit();
});


console.log(`${new Date().getTime()} worker pid ${process.pid}` )
//断开连接
process.disconnect()