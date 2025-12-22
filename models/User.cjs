const { DataTypes } = require('sequelize');
const { sequelize } = require('../api/index.cjs');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    address: { type: DataTypes.TEXT },
    gender: { 
        type: DataTypes.ENUM('Male', 'Female', 'Other', 'Prefer not to say') 
    },
    nationality: { type: DataTypes.STRING }
});

module.exports = User;