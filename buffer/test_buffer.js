
let arr = ['h'.to,'e','l','l','o'];
let alloc = Buffer.alloc(10);
let allocUnsafe = Buffer.allocUnsafe(10);
console.log(alloc)//<Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(allocUnsafe)//<Buffer 10 d6 33 86 21 00 00 00 10 d6>


let str = 'hello world!你好世界';
let buffer2 = Buffer.from(str);
console.log(buffer2.length)
console.log(str.length)
console.log(buffer2.toString('utf-8',0,12))//hello world!




























