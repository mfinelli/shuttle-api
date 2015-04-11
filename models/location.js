var Sequelize = require('sequelize');
var database = require('../config/database');
var Bus = require('./bus');

var Location = database.define('location', {
    timestamp: {type: Sequelize.DATE, allowNull: false},
    latitude: {type: Sequelize.FLOAT, allowNull: false},
    longitude: {type: Sequelize.FLOAT, allowNull: false}
});
Location.belongsTo(Bus, {foreignKeyConstraint: true});

module.exports = Location;
