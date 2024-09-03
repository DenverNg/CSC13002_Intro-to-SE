const express = require('express');
const {getDashboard, getTransactions, getDailyReports, getMonthlyReports, getSettings, getCreateBookForm, postCreateBookForm, getDepositForm, postDepositForm,  getSettings_Delete, postDeleteTermDeposit,getAddTermDeposit,postAddTermDeposit,
    getModifyTermDeposit, postModifyTermDeposit,getModifyMinValue, postModifyMinValue
, getWithdrawForm, postWithdrawForm, postDailyReports, postMonthlyReports,getPassword} = require('../controllers/homeControllers');
const router = express.Router();


//Dashboard
router.get('/', getDashboard);

//Quản lý sổ
router.get('/quan_ly_so', getTransactions);
router.get('/taoso_form', getCreateBookForm);
router.post('/taoso_form/xacnhan', postCreateBookForm);
router.get('/guitien_form', getDepositForm);
router.post('/guitien_form/xacnhan', postDepositForm);
router.get('/ruttien_form', getWithdrawForm);
router.post('/ruttien_form/xacnhan', postWithdrawForm);

//Báo cáo
router.get('/bao_cao_ngay', getDailyReports);
router.post('/bao_cao_ngay', postDailyReports);
router.get('/bao_cao_thang', getMonthlyReports);
router.post('/bao_cao_thang', postMonthlyReports);

//Cài đặt
router.get('/mat_khau', getPassword);
router.get('/cai_dat', getSettings);

router.get('/cai_dat/xoa', getSettings_Delete);
router.post('/cai_dat/xoa/xacnhan', postDeleteTermDeposit);

router.get('/cai_dat/them', getAddTermDeposit);
router.post('/cai_dat/them/xacnhan', postAddTermDeposit);

router.get('/cai_dat/sua', getModifyTermDeposit);
router.post('/cai_dat/sua/xacnhan', postModifyTermDeposit);

router.get('/cai_dat/sua_min', getModifyMinValue);
router.post('/cai_dat/sua_min/xacnhan', postModifyMinValue);



module.exports = router;