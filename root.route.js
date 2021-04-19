const express = require('express');
const app = express();
const { authHandler } = require('./lib/auth');

// import routes
const userRoutes = require('./routes/user.route');
const testRoutes = require('./routes/test.route');

// user routes
app.use('/', userRoutes);

// private routes
app.use('/tests', authHandler, testRoutes);

module.exports = app;