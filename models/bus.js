var Sequelize = require('sequelize');
var database = require('../config/database');
var Beacon = require('./beacon')

var Bus = database.define('bus', {
    number: {type: Sequelize.STRING, allowNull: false}
});
Bus.belongsTo(Beacon, {foreignKeyConstraint: true});

module.exports = Bus;