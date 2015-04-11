var Sequelize = require('sequelize');
var database = require('../config/database');
//var Stop = require('./stop');

var Route = database.define('route', {
    number: {type: Sequelize.STRING}
});
//Route.hasOne(Stop, {as: 'firstStop', foreignKey: 'firstStop', foreignKeyConstraint: true});

module.exports = Route;
