const fs = require('fs');
const promisify = function promisify(fn, receiver) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
            fn.apply(receiver, [].concat(args, [function (err, res) {
                return err ? reject(err) : resolve(res);
            }]));
        });
    };
};
const path = "C:\\wrokspace\\webstorm\\node-study\\express";

const readFilePromise  = promisify(fs.readFile,fs);
const readdirPromise  = promisify(fs.readdir,fs);
const statPromise  = promisify(fs.stat,fs);

async function readFile() {
    let stats =  await statPromise(path);
    if(stats.isDirectory()){
        readDir(path)
    }
}

async function readDir(path) {
    let dir = await readdirPromise(path);

}

readFile();

