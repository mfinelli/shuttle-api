var Sequelize = require('sequelize');
var sequelize = new Sequelize('shuttle', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;