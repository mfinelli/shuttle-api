var Sequelize = require('sequelize');
var database = require('../config/database');

var Beacon = database.define('beacon', {
    phone_number: {type: Sequelize.STRING(35), allowNull: false}
});

module.exports = Beacon;