const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const { singupValidator, validatedResult, loginValidator } = require('../lib/validator');

router.post('/signup', singupValidator, validatedResult, adminController.signUp);
router.post('/login', loginValidator, validatedResult, adminController.login);

module.exports = router;