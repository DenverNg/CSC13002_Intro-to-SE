const express = require('express');
const {getDashboard, getTransactions, getDailyReports, getMonthlyReports, getSettings, getForm, postDeposit_Form} = require('../controllers/homeControllers');
const router = express.Router();



router.get('/', getDashboard);
router.get('/transactions', getTransactions);
router.get('/daily-reports', getDailyReports);
router.get('/monthly-reports', getMonthlyReports);
router.get('/settings', getSettings);
router.get('/form', getForm);
router.post('/guitien', postDeposit_Form);
module.exports = router;