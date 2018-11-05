const Crawler = require('crawler');//http://node-crawler.readthedocs.io/zh_CN/latest/reference/main/
const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e
const EventEmitter = require('events');
const fs = require('fs');

const DOMAIN = "http://wiki.ziroom.com";
let emitter = new EventEmitter();
const pages = [];
const passwordPages = [];
const gitPages = [];


const gitRegex = new RegExp("[a-zA-z]+://[^\\s]*.git");
const password = "密码";


let corruntPage = 0;


let html = fs.readFileSync("test.html").toString();

const header = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": "gitlab_session=96e925f1edf77978e7807e7785d8ee56; gr_user_id=77cc876c-cfbe-4749-924b-83f00146fb9c; _ga=GA1.2.1384760906.1532400330; Hm_lvt_038002b56790c097b74c818a80e3a68e=1532501109,1534123190; CURRENT_CITY_CODE=110000; CURRENT_CITY_NAME=%E5%8C%97%E4%BA%AC; _gid=GA1.2.395890900.1535364065; uid=db5b9f69-0999-3b60-b136-359773598431; ziroom_userName=wenpengyuan; collapsed_nav=false; ziroom_token=76cf21fc182b94b707fa0be8650b5618; passport_token=412bd981-1f13-4a26-9032-5201342509bf",
    // "Referer":"http://wiki.ziroom.com/login.action?logout=true",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
};

const crawler = new Crawler({
    headers: header,
    jQuery: false,//res.$ 自带的DOM解析工具，此处不要自带的
    maxConnections: 20,//最大连接数，默认10我网速慢设置为5
    // skipDuplicates: true,
    callback: function (err, res, done) {
        if (err) {
            throw err;
        }
        const $ = cheerio.load(res.body, {decodeEntities: false});
        let href = "";
        if (res.request) {
            href = res.request.uri.href;
        }


        if (!$("script").toString()) {
            $('ul').children().each(function (index, li) {
                let aTags = $(li).find("span");
                if ($(aTags[0]).attr('class') == "no-children icon") {
                    emitter.emit("parseChildNode", $, li, href);
                } else {
                    emitter.emit("parseParentNode", $, li, href);
                }
            });
        }


        done();
    }
});


emitter.on("parseParentNode", function ($, li, url) {
    let aTag = $(li).find('a')[1];
    let uri = $(aTag).attr('href');
    if (uri && uri.indexOf("=") > -1) {
        let pageId = uri.split("=")[1];
        let url = `http://wiki.ziroom.com/plugins/pagetree/naturalchildren.action?decorator=none&excerpt=false&sort=position&reverse=false&disableLinks=false&expandCurrent=true&hasRoot=true&pageId=${pageId}&treeId=0&startDepth=0&mobile=false&treePageId=1856056&_=1533644739073`;
        crawler.queue(url);

        pages.push(DOMAIN + uri);
        emitter.emit("parse");
    }
});

emitter.on("parseChildNode", function ($, li, url) {
    let uri = $(li).find('a').attr('href');


    pages.push(DOMAIN + uri);
    emitter.emit("parse");
});


emitter.on("parse",function () {
    while (pages.length > 0) {
        let url = pages.pop();
        crawler.queue({
            uri: url,
            callback: function (err, res, done) {

                const $ = cheerio.load(res.body, {decodeEntities: false});
                let text = $.text();

                if (gitRegex.test(text)) {
                    gitPages.push(url)
                } else if (text.indexOf(password) > -1) {
                    passwordPages.push(url)
                }

                done();
            }
        })



        console.log(corruntPage++);
    }
});


crawler.queue([{
    html: html
}]);

crawler.on('drain', function () {
    console.log("包含密码的页面："+passwordPages.length+"个");
    console.log(passwordPages);
    console.log("==================================");

    console.log("包含git的页面："+gitPages.length+"个");
    console.log(gitPages);
});