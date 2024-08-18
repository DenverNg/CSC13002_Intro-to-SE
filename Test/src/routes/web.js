const express = require('express');
const {getDashboard, getTransactions, getDailyReports, getMonthlyReports, getSettings, getCreateBookForm, postCreateBookForm, getDepositForm, postDepositForm,  getSettings_Delete, deleteTermDeposit} = require('../controllers/homeControllers');
const router = express.Router();



router.get('/', getDashboard);
router.get('/quan_ly_so', getTransactions);
router.get('/bao_cao_ngay', getDailyReports);
router.get('/bao_cao_thang', getMonthlyReports);
router.get('/cai_dat', getSettings);
router.get('/cai_dat/xoa', getSettings_Delete);
router.post('/cai_dat/xoa/xoa_kyhan', deleteTermDeposit);
//router.post('/cai_dat/them', postSettings_Add);
//router.post('/cai_dat/sua', postSettings_Moddify);


router.get('/taoso_form', getCreateBookForm);
router.post('/taoso_form/xacnhan', postCreateBookForm);

router.get('/guitien_form', getDepositForm);
router.post('/guitien_xacnhan', postDepositForm);

// router.get('/ruttien_form', getWithdrawForm);
// router.post('/ruttien_xacnhan', postWithdrawForm);






module.exports = router;