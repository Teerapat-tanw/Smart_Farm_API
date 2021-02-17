var MongoClient = require('mongodb').MongoClient;
const { json } = require('body-parser');
var express = require("express");
var router = express.Router();

router.post('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var channel = req.body.channel
        var dbo = client.db(dbName);
        var myquery = { uid:req.headers.uid, "devicename": req.headers.devicename};
        
        var d1 = {
            $set: {D1:req.body.status } 
        };
        var d2 = {
            $set: {D2:req.body.status } 
        };

        var d5 = {
            $set: {D5:req.body.status } 
        };

        var d6 = {
            $set: {D6:req.body.status } 
        };      
        var automation = {
            $set: {automation:req.body.status } 
        };
        dbo.collection("sensors").updateMany(myquery, channel == "D1" ? d1 : channel == "D2" ? d2 : channel == "D5" ? d5 : channel == "D6" ? d6 : channel == "automation" ? automation : err  , function (err, result) {
            if (err) {
                res.send(false);
            };
            res.status(200).send(true)
            client.close();
        });
    });
});
module.exports = router;
