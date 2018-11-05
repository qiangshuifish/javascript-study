const process = require("process");

// nextTick 回调函数在下句代码执行完后执行
function foo() {
    console.log('foo')
}
process.nextTick(foo)
console.log('bar')
console.log('bar1')
;// bar bar1 foo


/*
// 放回当前目录
let cwd = process.cwd();
console.log(cwd)

// 修改程序执行目录
process.chdir()

// 终止程序
process.abort();
*/
//  推出系统程序
// process.exit()







