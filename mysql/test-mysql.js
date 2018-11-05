var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});

/**
 CREATE TABLE `tag` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) DEFAULT NULL,
 `pathname` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `name` (`name`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
 */
connection.connect();

// 增加
const  addSql = 'INSERT INTO `tag` ( `name`, `pathname`) VALUES ( ?, ?);';
let  addSqlParams = ['python', 'python'];
connection.query(addSql,addSqlParams,function (err, result) {
    if(err)throw err;
    console.log('--------------------------INSERT----------------------------');
    console.log('INSERT ID:',result.insertId);
    console.log('-----------------------------------------------------------------\n\n');
});

// 更新
const  updateSql = 'UPDATE `tag` SET `pathname`=? WHERE (`pathname`=?)';
let  updateSqlParams = ['py', 'python'];
connection.query(updateSql,updateSqlParams,function (err, result) {
    if(err)throw err;
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows',result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

//删除
const deleteSql = 'delete  from tag WHERE (`pathname`=?)';
let deleteParams = ['py'];
connection.query(deleteSql,deleteParams, function (error, results, fields) {
    if (error) throw err;
    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows', results.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});
//查询
connection.query('select * from tag', function (error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        var obj = results[i];
        console.log(obj)
    }
});
connection.end();

