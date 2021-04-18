const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Option = require('./option.modal');

const Question = database.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const QuestionOption = Question.hasMany(Option, {as: 'options'});

module.exports = {
    Question,
    QuestionOption
};