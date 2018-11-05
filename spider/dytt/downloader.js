const Crawler = require("crawler");
const fs = require("fs");
const OSS = require('ali-oss');
const co = require('co');
var path = require("path");
const {site,isValidUrl} = require('../mp4ba/config.js');
const EventEmitter = require('events');
const mongo = require('../../mongodb/mongo.js');

const client = new OSS({
    region: 'oss-cn-qingdao',
    accessKeyId: 'LTAI5PhJlWX20uK7',
    accessKeySecret: 'P4951cedWxjkRbLhDRQAy2p6qb0SQ3'
});
client.useBucket('crawler-pictures');
const emitter = new EventEmitter();
const cel_image_log = 'image_log';


const movies = [];
const crawler = new Crawler({
    encoding: null,//不编码
    jQuery: false,// 不转DOM
    callback: function (err, res, done) {
        if (err) {
            console.error(err);
        } else {
            doneImageCount++;
            const fileName = getFileNameFromUrl(res.request.uri.href);
            let image_log = {
                uri: res.request.uri.href,
                name: fileName,
                movie_url: res.options.movie_url,
                movie_id: res.options.movie_id,
                movie_name: res.options.movie_name,
                date: res.options.date,
                create_time: new Date()
            }
            const buffer = new Buffer(res.body);
            let dirPath = `movie/${image_log.date}/${image_log.movie_name}`;
            //图片上传
            co(upload(buffer,`${dirPath}/${fileName}`,image_log));
            /*
            mkdirsSync(dirPath);
            fs.createWriteStream(`${dirPath}/${fileName}`,{flag:'r+'}).write(res.body);
            mongo.insert('image_log',image_log).then(function (result) {
                console.log(`=======================下载 ${image_log.movie_name} ${fileName}===========================`)
            }).catch(function (err) {
                console.error(err);
            });*/
        }
        done();
    }
});

let pageSize = 5;
let crrountPage = 1;

let doneImageCount = 0;
let doneMovieCount = 0;

emitter.on('downloader',function () {
    while(movies.length > 0){
        const movie = movies.pop();
        let images = [];
        movie.images.forEach(function (url) {
            url = isValidUrl(url);
            if (url) {
                mongo.findCont(cel_image_log, {url: url})
                    .then(function (count) {
                        images.push(url);
                        if(count <= 0){
                            crawler.queue({
                                uri: url,
                                movie_url: movie.url,
                                movie_id: movie._id,
                                movie_name: movie.name,
                                date: movie.publish_date || movie.date
                            });
                        }
                    });
            }
        });
        movie.images = images;
    }
    doneMovieCount++;
    emitter.emit('produce');
});

emitter.on('produce',function () {
    console.log("produce")
});


/**
 * 递归创建目录 异步方法
 * @param dirname
 * @param callback
 */
function mkdirsSync(dirpath, mode) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        console.error("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
}

function getFileNameFromUrl(url) {
    let name = url.split("/").pop();
    if(name.indexOf(site.name_regex)){
        name = name.replace(site.name_regex,"");
    }
    return name;
}


//上传一个文件
function* upload(data,path,image_log) {
    var result = yield client.put(path,data);
    const oss_url = result.res.requestUrls.pop();
    image_log.oss_url= oss_url;
    insertImageLog(image_log,true);
   /* mongo.insert(cel_image_log,image_log).then(function (res) {
        if(res.insertedCount > 0){
            // console.log(`============== 第${doneImageCount}记录 ${image_log.name} 完毕 ==============`)
            console.log(`=======================下载 ${image_log.movie_name} ${image_log.name}===========================`)
        }
    }).catch(function (e) {
        console.error(e);
    });*/
}

function insertImageLog(image_log,isSuccess) {
    mongo.findCont(cel_image_log,{url:image_log.uri})
        .then(function (count) {
            if(count <= 0){
                mongo.insert(cel_image_log,image_log)
                    .then(function (res) {
                        if(res.insertedCount > 0){
                            if(isSuccess){
                                console.log(`=======================下载成功 ${image_log.movie_name} ${image_log.name}===========================`)
                            }else{
                                console.log(`=======================【下载失败】 ${image_log.movie_name} ${image_log.name}===========================`)
                            }
                        }
                    }).catch(function (err) {
                        console.error(err);
                    });
            }
        }).catch(function (err) {
            console.error(err);
        });
}

crawler.on('drain',function () {
    dataBase.close();
});

//=======================test==========================
let dataBase;
mongo.initClient(function (db) {
    dataBase = db;
    mongo.initClient(function (db) {
        mongo.findLimit("movie",{},10).then(function (result) {
            result.forEach(function (movie) {
                movies.push(movie);
            })
            emitter.emit('downloader');
        });

    });
});
