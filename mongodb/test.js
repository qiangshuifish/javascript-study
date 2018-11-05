const mongo = require("./mongo.js");


mongo.initClient(function (db) {
    mongo.findLimit("picture",{},5).then(function (result) {
        console.log(result.length)
        db.close();
    });

})