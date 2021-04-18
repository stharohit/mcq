const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');

console.log(dbConfig);

const database = new Sequelize(dbConfig);

module.exports = database;