// external dependencies
var express = require('express');
var bodyParser = require('body-parser');
var beacon = require('./routes/beacon');
var baseroute = require('./routes/index');

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