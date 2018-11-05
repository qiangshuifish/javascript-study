console.log(`进程 ${process.argv[2]} 执行`)
process.on('message', function(m){
    console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});
console.log(`support pid ${process.pid}`)