const MongoClient = require('mongodb').MongoClient;
//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect
let {mongodb} = require('../spider/mp4ba/config.js');

let client;
let dataBase;
function initClient(callback) {

    MongoClient.connect(mongodb.url, function (err, db) {
        if (err) {
            console.log("mongodb连接失败")
            throw err;
        }
        dataBase = db;
        client = db.db(mongodb.db);
        console.log("mongodb连接成功");
        callback(db);
    });
}



const insert = function (collectionName,obj) {
    if(obj instanceof Array){
        return new Promise(function (resolve,reject) {
            client.collection(collectionName).insertMany(obj, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }else{
        return new Promise(function (resolve,reject) {
            client.collection(collectionName).insertOne(obj, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};

const findAll = function (collectionName) {
    return new Promise(function (resolve,reject) {
        client.collection(collectionName).find({}).toArray(function (err, result) {
            if(err){
                reject(err);
            }
            return resolve(result);
        })
    });
}

const find  = function (collectionName,filter) {
    return new Promise(function (resolve,reject) {
        client.collection(collectionName).find(filter).toArray(function (err, result) {
            if(err){
                reject(err);
            }
            return resolve(result);
        })
    });
};
const findLimit = function (collectionName, filter, limit, skip) {
    return new Promise(function (resolve,reject) {
        let collection = client.collection(collectionName);
        if(filter){
            collection = collection.find(filter);
        }
        if(skip){
            collection = collection.skip(skip);
        }
        if(limit){
            collection = collection.limit(limit);
        }
        collection.toArray(function (err, result) {
            if(err){
                reject(err);
            }
            return resolve(result);
        })
    });
};

const updateById = function (collectionName,obj) {
    return new Promise(function (resolve, reject) {
        let updateStr = {$set:{
            oss_images : obj.oss_images,
            image : obj.image
        }}
        client.collection(collectionName).updateOne({_id:obj.id}, updateStr, function(err, res) {
            if (err) throw reject(err);
            resolve(res);
        });
    })
};


const findCont = function (collectionName,filter) {
    return new Promise(function (resolve, reject) {
        client.collection(collectionName).find(filter).count(function (err, count) {
            if(err) reject(err);
            resolve(count);
        })
    })
};



const closeClient = function () {
    if(client){
        dataBase.close();
    }
};

module.exports = {insert,find,findLimit,findCont,initClient,updateById,closeClient};
