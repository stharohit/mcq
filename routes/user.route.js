const express = require('express');
const { singupValidator, loginValidator, validatedResult } = require('../lib/validator');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/user/signup', singupValidator, validatedResult, userController.signUp);
router.post('/admin/signup', singupValidator, validatedResult, userController.adminSignUp);
router.post('/login', loginValidator, validatedResult, userController.login);

module.exports = router;