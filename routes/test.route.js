const express = require('express');
const router = express.Router();
const testController = require('../controller/test.controller');
const { adminAccessHandler, userAccessHandler } = require('../lib/auth');

router.get('/', testController.getTests);
router.post('/createTests', adminAccessHandler, testController.createTests);
router.post('/addMCQ', adminAccessHandler, testController.addMCQToTests);
router.post('/submit', userAccessHandler, testController.takeTests);
router.get('/reports', adminAccessHandler, testController.getReports);
router.get('/reports/failed', adminAccessHandler, testController.failedReports);
router.get('/reports/passed', adminAccessHandler, testController.passedReports);
router.get('/user/reports', userAccessHandler, testController.getUserReports);

module.exports = router;