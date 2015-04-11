var Sequelize = require('sequelize');
var database = require('../config/database');
var Route = require('./route');

var Stop = database.define('stop', {
    latitude: {type: Sequelize.FLOAT},
    longitude: {type: Sequelize.FLOAT},
    station: {type: Sequelize.BOOLEAN},
});
Stop.hasOne(Stop, {as: 'previousStop', foreignKey: 'previousStopId'});
Stop.hasOne(Stop, {as: 'nextStop', foreignKey: 'nextStopId'});
Stop.hasOne(Route, {as: 'firstStop', foreignKey: 'firstStopId', foreignKeyConstraint: true});

module.exports = Stop;
