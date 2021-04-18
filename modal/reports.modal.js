const { DataTypes } = require('sequelize');
const database = require('../config/db');
const User = require('./user.modal');

const Reports = database.define('Reports', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    isPassed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    testId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const ReportOfUser = Reports.belongsTo(User, {as: 'user', foreignKey: {name: 'userId', field: 'userId'}});

module.exports = {
    Reports,
    ReportOfUser
};