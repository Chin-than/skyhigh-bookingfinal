const { DataTypes } = require('sequelize');
const { sequelize } = require('../api/index.cjs');

const Flight = sequelize.define('Flight', {
    flightId: { type: DataTypes.STRING, allowNull: false, unique: true },
    airline: DataTypes.STRING,
    flightNumber: DataTypes.STRING,
    origin: DataTypes.STRING,
    originCode: DataTypes.STRING,
    destination: DataTypes.STRING,
    destinationCode: DataTypes.STRING,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    duration: DataTypes.STRING
});

module.exports = Flight;