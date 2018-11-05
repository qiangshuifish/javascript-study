let express = require("express");
const app = express();

const options = {
    dotfiles: 'ignore',//是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	String	“ignore”
    etag: false,//是否启用 etag 生成	Boolean	true
    extensions: ['htm', 'html'],//设置文件扩展名备份选项	Array	[]
    index: false,//发送目录索引文件，设置为 false 禁用目录索引。	Mixed	“index.html”
    lastModified:true,//设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。	Boolean	true
    maxAge: '1d',//以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	Number	0
    redirect: false,//当路径为目录时，重定向至 “/”。	Boolean	true
    setHeaders: function (res, path, stat) {//设置 HTTP 头以提供文件的函数。	Function
        res.set('x-timestamp', Date.now());
    }
};
app.use(express.static('../../../public/static',options));






let port = 3000;
app.listen(port);
console.log(`start with ${port}`)