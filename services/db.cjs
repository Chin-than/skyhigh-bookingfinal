// File: services/db.cjs
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skyhigh_db', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;