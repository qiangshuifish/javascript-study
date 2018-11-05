'use strict';

// 内置P romise
var p = (new Promise(function(resolve, reject){
    reject(new Error('Error from promise by reject'));
    // 或者通过 throw 的方式抛出，效果相同
    // throw new Error('Error from promise by throw');

}));

// 或者在 then 通过 throw 抛出错误，也有同样效果
/**
 var p = (new Promise(function(resolve){
    resolve('Data');
}))
 .then(function(res){
    console.info('Receive: ', res);
    throw new Error('Error from promise by throw');
});
 */

process.on('uncaughtException', function(e){
    console.log('uncaughtException:', e.message);
});

/*
 这里被注释时程序会报错
process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection:', reason.message);
});
*/

process.on('rejectionHandled', (p) => {
    console.log('rejectionHandled:', p.toString());
});

setTimeout(function(){
    p.catch(function(e){
        console.error('p.catch', e.message);
    });
}, 1e3);