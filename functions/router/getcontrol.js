var MongoClient = require('mongodb').MongoClient;
var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var query = {uid : req.headers.uid}
    
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send(result)
            client.close()
        });
    });
});
module.exports = router;
// let data = JSON.stringify(result)
// const mpa1 = result.map(item=>item.users.devices.devicename)

