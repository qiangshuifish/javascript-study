
// get可以直接使用浏览器测试，post,put,delete更爱method的值即可

const fetch = require('node-fetch');
fetch('http://localhost:3000/index', { method: 'post', body: 'a=1' })
    .then(res => res.text())
    .then(body => console.log(body));


fetch('http://localhost:3000/param/1/zhangsan', { method: 'post', body: 'a=1' })
    .then(res => res.text())
    .then(body => console.log(body));

fetch('http://localhost:3000/wildcard/param/1/zhangsan', { method: 'post', body: 'a=1' })
    .then(res => res.text())
    .then(body => console.log(body));

fetch('http://localhost:3000/regex/1/zhangsan', { method: 'post', body: 'a=1' })
    .then(res => res.text())
    .then(body => console.log(body));

fetch('http://localhost:3000/regex/param/1/zhangsan', { method: 'post', body: 'a=1' })
    .then(res => res.text())
    .then(body => console.log(body));














