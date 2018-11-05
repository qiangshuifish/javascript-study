let express = require("express");
const app = express();



app.set('views', '../../../public/views')
app.set('view engine', 'jade')




app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there views!'},function (err, html) {
        res.send(html);
    });
});



let port = 3000;
app.listen(port);
console.log(`start with ${port}`)