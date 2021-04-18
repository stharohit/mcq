require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./config/db');

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connect to database
db.authenticate().then(() => {
    console.log('Connected to database.... Happy Coding!');
    // db.drop();
    db.sync();
}).catch((error) => {
    console.log(error);
})

// root route
const root = require('./root.route');
app.use('/', root);

// listen to express in current port
app.listen(PORT, () => {
    console.log('Listening to port ', PORT);
})