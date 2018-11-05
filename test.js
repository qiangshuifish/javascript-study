const express = require('express');
const fs = require('fs');
const mime = require('mime-types');



const promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => {
        return err ? reject(err) : resolve(res);
      }]);
    });
  };
};
const readFile = promisify(fs.readFile, fs);
const readDir = promisify(fs.readdir, fs);
const stat = promisify(fs.stat, fs);

const app = express();
const router = express.Router();
const rootPath = "D:\\github\\node-study";

router.get("*", async function (req, res) {
  let url = decodeURI(req.url);
  if(url === '/favicon.ico'){
    return;
  }

  let path = rootPath;
  if (url !== '/') {
    path = `${rootPath}${url}`
  }


  if(!await isDir(path)){
    await renderFile(path,res)
    return;
  }


  let filePaths = await readDir(path);



  let hasChildDir = false;
  for (let filePath of filePaths) {
    hasChildDir = hasChildDir?true:await isDir(`${path}/${filePath}`)
  }
  if(hasChildDir){
    res.send(await renderDirFlies(filePaths,url));
    return;
  }




  res.send(await renderDirFlies(filePaths,url));
  return;
});

/**
 * 是否为目录
 * @param path
 * @returns {Promise<boolean>}
 */
async function isDir(path) {
  let stats = await stat(path);
  return stats.isDirectory();
}

/**
 * 是否为文件
 * @param path
 * @returns {Promise<boolean>}
 */
async function isFile(path) {
  let stats = await stat(path);
  return stats.isFile();
}

/**
 * 渲染单个文件
 * @param path
 * @returns {Promise.<string>}
 */
async function renderFile(path,res){
  if(!(await isFile(path))){
     res.status(404);
     return Promise.resolve();
  }
  if(mime.lookup(path).indexOf("image") > -1){
    res.send(await readFile(path));
    return Promise.resolve();
  }

  let string = (await readFile(path)).toString()
  res.send(`<html><head></head><body><pre>${string}</pre></body></html>`);
}

/**
 * 以列表形式渲染文件夹
 * @param paths
 * @param url
 * @returns {string}
 */
async function renderDirFlies(paths,url) {
  let directories = "";
  for (let path of paths) {
    //不是文件夹且是图片
    if(!(await isDir(`${rootPath}/${url}/${path}`)) && (mime.lookup(path).indexOf("image") > -1)){
      directories = directories + `<img src="${url === '/' ?"":url}/${path}" alt="${path}"/><br>`
    }else{
      directories = directories + `<a href="${url === '/' ?"":url}/${path}">${path}</a><br>`
    }
  }
  return `<html><head></head><body>${directories}</body></html>`;

}


app.use(router);


let port = 3000;
app.listen(port);
console.log(`start with ${port}`);

process.on('uncaughtException', function(e){
  console.log('uncaughtException:', e.message);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection:', reason.message);
    console.error(reason)
});
process.on('rejectionHandled', (p) => {
  console.log('rejectionHandled:', p.toString());
});