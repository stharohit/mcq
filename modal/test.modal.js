const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { Question } = require('./question.modal');

const Tests = database.define('Tests', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

const TestsQuestion = Tests.hasMany(Question, { as: "question" });

module.exports = {
    Tests,
    TestsQuestion
};