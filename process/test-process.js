
console.log(`启动参数：${process.argv}`)
console.log(`node安装路径：${process.execPath}`)
console.log(`node版本：${process.version}`)
console.log(`运行平台：${process.platform}`)
console.log(`进程pid：${process.pid}`)
console.log(`窗口标题：${process.title}`)
console.log(`处理器架构：${process.arch}`)
console.log(`环境变量：${JSON.stringify(process.env)}`)
console.log(`V8配置：${JSON.stringify(process.config)}`)

let memoryUsage = process.memoryUsage();
console.log(`node程序消耗内存：${(memoryUsage.rss)/1024/1024} MB`)
console.log(`V8 分配内存：${memoryUsage.heapTotal/1024/1024} MB`)
console.log(`V8 消耗内存：${memoryUsage.heapUsed/1024/1024} MB`)
