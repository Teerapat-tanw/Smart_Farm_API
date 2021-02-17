var MongoClient = require('mongodb').MongoClient;
const { json } = require('body-parser');
var express = require("express");
var router = express.Router();



router.post('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);
        var myquery = {
            uid: req.headers.uid,
            devicename: req.headers.devicename
        };
        var newvalues = {
            $push: {
                "inputValue": { "temperature": req.body.temperature !== null ? req.body.temperature : "25.0", "humidity": req.body.humidity !== null ? req.body.humidity :"50", "light": req.body.light  !== null ? req.body.light: "DISABLED", "timestamp": req.body.timestamp !== null ? req.body.timestamp: Math.floor(Date.now() /1000).toString() }
            }
        };
        dbo.collection("sensors").updateMany(myquery, newvalues, function (err, result) {
            if (err) throw err;
            res.status(200).send(true)
            client.close();
        });
    });
});
module.exports = router;
