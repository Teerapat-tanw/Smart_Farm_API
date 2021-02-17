var MongoClient = require('mongodb').MongoClient;
var express = require('express');
const { Server } = require('mongodb');
var router = express.Router();



router.get('/all', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send(result)
            client.close()
            
        });
    });
});
//Get All
router.get('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid,
            devicename: req.headers.devicename
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send(result)
            client.close()
        });
    });
});

//Get Last
router.get('/last', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid,
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send([result[0].inputValue[result[0].inputValue.length - 1]])
            client.close()
        });
    });
});



router.get('/chart', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid,
            devicename: req.headers.devicename
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(query.uid == undefined){
                res.send("Error")
            }
           
            var chart = result[0].data_chart.length >=6 ? result[0].data_chart.slice(Math.max(result[0].data_chart.length - 6 ))  : result[0].data_chart;
            res.send(chart) ;
            client.close()
        });
    });
});



router.post('/chart', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.z5vrr.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        var dbo = client.db(dbName);
        var myquery = {
            uid: req.headers.uid,
            devicename: req.headers.devicename
        };
        var newvalues = {
            $push: {
                "data_chart": { "temperature": req.body.temperature !==null ? req.body.temperature : "25.0", "humidity": req.body.humidity !== null ? req.body.humidity : "50", "light": req.body.light !== null ? req.body.light: "DISABLED", "timestamp": req.body.timestamp !== null ? req.body.timestamp: Math.floor(Date.now() /1000).toString() }
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
// let data = JSON.stringify(result)
// const mpa1 = result.map(item=>item.users.devices.devicename)

