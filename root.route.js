const express = require('express');
const app = express();
const { authHandler } = require('./lib/auth');

// import routes
const adminRoutes = require('./routes/admin.route');
const userRoutes = require('./routes/user.route');
const testRoutes = require('./routes/test.route');

// amdin routes
app.use('/admin', adminRoutes);

// user routes
app.use('/user', userRoutes);

// private routes
app.use('/tests', authHandler, testRoutes);

module.exports = app;