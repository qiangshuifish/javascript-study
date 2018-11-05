const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://59.110.138.143:2717/remote";
const connectDb = function (MongoClient, url) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("连接失败")
                return reject(err);
            }
            resolve(db);
            console.log("连接成功")
        });
    });
};
const insertDate = async function (collectionName,obj) {
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");

    if(obj instanceof Array){
        dbase.collection(collectionName).insertMany(obj, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    }else{
        dbase.collection(collectionName).insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    }

};
let obj = {
    name: "张三",
    age: "18"
};
// insertDate('test',obj);
let objs = [{
    name: "王五",
    age: "28"
},{
    name: "赵六",
    age: "82"
}];
// insertDate('test',objs);



const find  = async function (filter) {
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");
    dbase.collection("test").find(filter).toArray(function (err, result) {
        console.log(result)
        db.close()
    })
}

// find();
// find({"name" : "张三"})


const update = async function(type,filter,update){
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");
    if(type === "updateOne"){
        dbase.collection('test').updateOne(filter,update,function (err, result) {
            console.log(`修改条数：${result.result.nModified}`)
            db.close()
        })
    }else{
        dbase.collection('test').updateMany(filter,update,function (err, result) {
            console.log(`修改条数：${result.result.nModified}`)
            db.close()
        })

    }
}

// update('updateOne',{"name" : "张三"},{$set : {"url":"http://www.qiangshuidiyu.xin"}});
// update('updateMany',{"name" : "张三"},{$set : {"url":"http://blog.qiangshuidiyu.xin"}});

const del = async function (type,filter) {
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");
    if(type === 'deleteOne'){
        dbase.collection('test').deleteOne(filter,function (err, result) {
            console.log(`删除条数：${result.deletedCount}`)
            db.close()
        })
    }else{
        dbase.collection('test').deleteMany(filter,function (err, result) {
            console.log(`删除条数：${result.deletedCount}`)
            db.close()
        })
    }

}
/*
del('deleteOne',{name : "王五"});
del('deleteMany',{name : "王五"});*/


const sortAndLimit = async function (sort,limit,skip) {
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");
    dbase.collection('test').find().sort(sort).skip(skip).limit(limit).toArray(function (err, result) {
        console.log("=====================")
        console.log(result)
        console.log("=====================")
    })
};

let sort = {
    age : 1 // 1-正序，2-倒序
};

// sortAndLimit(sort,5,2);

const lookUp = async function () {
    const db = await connectDb(MongoClient, url);
    const dbase = db.db("remote");
    dbase.collection('test').aggregate([
        {
            $lookup:{
                from: 'test2', //右集合
                localField:'name',//左集合join字段
                foreignField:'name',//右集合join字段
                as:'name' //新生成字段(Array 类型数据)
            }
        }
    ],function (err, res) {
        res.toArray(function(err, documents) {
            console.log(JSON.stringify(documents))
        });
    });
}
lookUp();

