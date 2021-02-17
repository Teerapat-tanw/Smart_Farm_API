var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var router = express.Router();

router.post('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);
        var data = req.body
        // {
        //     uid: req.body.uid,
        //     devicename: req.body.devicename,
        //     temperature: req.body.temperature,
        //     humidity: req.body.humidity,
        //     time: req.body.time
        // }
        dbo.collection("hardware").insertOne(data, function (err) {
            console.log(err)
            if (err) {
                res.send(err)
            }
            res.send(data)
        });
    });
});


module.exports = router;