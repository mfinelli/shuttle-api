// external dependencies
var express = require('express');
var bodyParser = require('body-parser');
var beacon = require('./routes/beacon');
var baseroute = require('./routes/index');
var Sequelize = require('sequelize');

// database connection and models
var database = require('./config/database');
var Location = require('./models/location');
var Beacon = require('./models/beacon');
var Bus = require('./models/bus');
var Route = require('./models/route');
var Stop = require('./models/stop');

database.sync().then(function(){
    // Here is an example how to add dummy data with a relationship
    /*b = Beacon.create({phone_number: '5555555555'}).then(function(be){
        bus = Bus.create({number: "Test"}).then(function(bu){
            bu.setBeacon(be);
        });
    });*/
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// route handlers
app.use('/', baseroute);
app.use('/beacon', beacon);

// start application
var server = app.listen(3000, function(){
    console.log('App listening at %s', server.address().port);
});
