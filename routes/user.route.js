const express = require('express');
const { singupValidator, loginValidator, validatedResult } = require('../lib/validator');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/signup', singupValidator, validatedResult, userController.signUp);
router.post('/login', loginValidator, validatedResult, userController.login);

module.exports = router;