var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var router = express.Router();

router.post('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db(dbName);
        var myobj = {
            uid: req.body.uid,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            phone: req.body.phone
        }
        dbo.collection("users").insertOne(myobj, function (err) {
            console.log(err)
            if (err) {
                res.send(err)
            }
            res.send(true)
        });
        var hardwareObj = {
            uid: req.body.uid,
            devicename: req.body.devicename !== null ? req.body.devicename: "NOT SET",
            value: []
        }
        dbo.collection("sensors").insertOne(hardwareObj, function (err) {
            console.log(err)
            if (err) {
                res.send(err)
            }
            res.send(true)
        });
    });
});
module.exports = router;