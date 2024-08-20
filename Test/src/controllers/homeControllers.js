const connection = require('../config/database');
const {getAllBooks, getDailyRP, getMonthlyRP, getAllTermDeposit, getActiveTermDeposit, getMininum, updateRateDeposit, 
    updateMininum, deleteTermDeposit, getNextMaSo, getTenKH, getLoaiTK, checkMaso, getMinMoney, 
    checkDaoHan, checkNgayRut, calTienLai, getLaiSuat, getThoiGianToiThieu} = require('../services/CRUD');
const {getCurrentDate} = require('../public/js/date');
const { set, get } = require('express/lib/response');


//Dashboard
const getDashboard = (req, res) => {
    res.render('Dashboard.ejs', {currentDate: getCurrentDate()});
}

//Transaction
const getTransactions = async(req, res) => {
    const results = await getAllBooks();
    res.render('Transactions.ejs', {
        listBooks: results,
        currentDate: getCurrentDate()});
}
const getCreateBookForm = async(req, res) => {
    const newMaSo = await getNextMaSo();
    res.render('CreateBook_form.ejs', {newMaSo: newMaSo});
} 

const postCreateBookForm = async (req, res) => {
    const action = req.body.action;
    if (req.body.MASO)
        MASO = req.body.MASO;
    else {
        maxMaSo = await getNextMaSo();
        const numericPart = parseInt(maxMaSo.slice(2) - 1, 10);

        // Increment the numeric part
        const nextNumericPart = (numericPart + 1).toString().padStart(6, '0');

        // Generate the new MaSo
        const newMaSo = `MS${nextNumericPart}`;

        MASO = newMaSo;
    }
    if (!action) {
        // Initial rendering of the verification page
        res.render('CreateBook_Verify.ejs', {
            MASO: MASO,
            LOAI: req.body.LOAI,
            TENKH: req.body.TENKH,
            CMND: req.body.CMND,
            DIACHI: req.body.DIACHI,
            SOTIEN: req.body.SOTIEN,
            NGAY: req.body.NGAY
        });
    } else if (action === 'confirm') {
        // Save data to the database
        const { MASO, LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN } = req.body;
        const query = 'CALL MOSOTIETKIEM(?, ?, ?, ?, ?, ?)';
        try {
            await connection.query(query, [LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN]);
            res.redirect('/quan_ly_so');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        // Go back to the form without saving
        res.redirect('/taoso_form');
    }
};

//Reports
const getDailyReports = async(req, res) => {
    //let date = req.body.NGAY;
    const results = await getDailyRP('2024-10-18'); //Chưa lấy được ngày từ user
    res.render('Daily_Report.ejs', {listDailyRP: results});
}
const getMonthlyReports = async(req, res) => {
    // const results = await getMonthlyRP('2024-10-18'); //Chưa lấy được ngày từ user
    // res.render('Monthly_Report.ejs');
    res.send('Monthly Report');
}
const getSettings = async(req, res) => {
    const resultsTerm = await getActiveTermDeposit();
    const resultMininum = await getMininum();
    res.render('Settings.ejs', {listTerm: resultsTerm, listMininum: resultMininum});
}



const getDepositForm = async(req, res) => {
    res.render('Deposit_form.ejs');
}

const postDepositForm = async(req, res) => {

    const action = req.body.action;
    const TENKH = await getTenKH(req.body.MASO);
    const LOAI = await getLoaiTK(req.body.MASO);
    const CHECKMASO = await checkMaso(req.body.MASO);
    const TIENTOITHIEU = await getMinMoney();
    if (!action) {
        // Initial rendering of the verification page
        res.render('Deposit_Verify.ejs', {
            LOAI: LOAI,
            CHECKMASO: CHECKMASO,
            TIENTOITHIEU: TIENTOITHIEU,
            MASO: req.body.MASO,
            TENKH: TENKH,
            NGAY: req.body.NGAY,
            SOTIEN: req.body.SOTIEN
        });
    } else if (action === 'confirm') {
        // Save data to the database
        const { MASO, NGAY, SOTIEN } = req.body;
        const query = 'CALL LAPPHIEUGUI(?, ?, ?)';
        try {
            await connection.query(query, [MASO, NGAY, SOTIEN]);
            res.redirect('/quan_ly_so');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        // Go back to the form without saving
        res.redirect('/guitien_form');
    }
}

const getWithdrawForm = async(req, res) => {
    res.render('Withdraw_form.ejs');
}

const postWithdrawForm = async(req, res) => {
    const action = req.body.action;
    const TENKH = await getTenKH(req.body.MASO);
    const LOAI = await getLoaiTK(req.body.MASO);
    const CHECKMASO = await checkMaso(req.body.MASO);
    const TIENTOITHIEU = await getMinMoney();
    const THOIGIANTOITHIEU = await getThoiGianToiThieu();

    const CHECKNGAYRUT = await checkNgayRut(req.body.NGAY, req.body.MASO);
    const CHECKDAOHAN = await checkDaoHan(req.body.NGAY, req.body.MASO);

    if (CHECKNGAYRUT == "ERROR" || (LOAI == 0 && CHECKDAOHAN != -1) || CHECKDAOHAN == 0) {
        LAISUAT = 0;
        TIENLAI = 0;
        THUCNHAN = 0;
    } 
    else {
    LAISUAT = await getLaiSuat(req.body.MASO);
    TIENLAI = await calTienLai(req.body.MASO,req.body.NGAY, req.body.SOTIEN);
    THUCNHAN = parseFloat(req.body.SOTIEN) + parseFloat(TIENLAI);
    }

    if (!action) {
        // Initial rendering of the verification page
        res.render('Withdraw_Verify.ejs', {
            LOAI: LOAI,
            CHECKMASO: CHECKMASO,
            TIENTOITHIEU: TIENTOITHIEU,
            LAISUAT: LAISUAT,
            TIENLAI: TIENLAI,
            THUCNHAN: THUCNHAN,
            CHECKNGAYRUT: CHECKNGAYRUT,
            CHECKDAOHAN: CHECKDAOHAN,
            THOIGIANTOITHIEU: THOIGIANTOITHIEU,
            //ALLOWWITHDRAW: ALLOWWITHDRAW,

            MASO: req.body.MASO,
            TENKH: TENKH,
            NGAY: req.body.NGAY,
            SOTIEN: req.body.SOTIEN
            
        });
    } else if (action === 'confirm') {
        // Save data to the database
        const { MASO, NGAY, SOTIEN } = req.body;
        const query = 'CALL LAPPHIEURUT(?, ?, ?)';
        try {
            await connection.query(query, [MASO, NGAY, SOTIEN]);
            res.redirect('/quan_ly_so');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        // Go back to the form without saving
        res.redirect('/ruttien_form');
    }
}

//Add new term deposit
const getAddTermDeposit = async(req, res) => {      
    const resultsTerm = await getActiveTermDeposit();
    const resultMininum = await getMininum();
    res.render('Settings_Add.ejs', {listTerm: resultsTerm, listMininum: resultMininum});

}

const postAddTermDeposit = async(req, res) => {
    const action = req.body.action;
    if (action === 'confirm') {
        const {TENKYHAN,THOIGIANDAOHAN,LAISUAT} = req.body;
        const query = 'INSERT INTO LOAI_SOTK(MALOAI, KYHAN, LAISUAT,TRANGTHAI)\
        VALUES (?,?,?,?)';
        try {
            await connection.query(query, [THOIGIANDAOHAN, TENKYHAN, LAISUAT, 1]);
            res.redirect('/cai_dat');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        res.redirect('/cai_dat');
    }
}
const getModifyTermDeposit = async(req, res) => {
    const resultsTerm = await getActiveTermDeposit();
    const resultMininum = await getMininum();
    res.render('Settings_ModifyRate.ejs', {listTerm: resultsTerm, listMininum: resultMininum});
}

const postModifyTermDeposit = async (req, res) => {
    const action = req.body.action;

    if (action === 'confirm') {
        const { MALOAI, LAISUAT } = req.body;

        // Kiểm tra xem MALOAI và LAISUAT có phải là mảng không và chúng có cùng độ dài không
        if (!Array.isArray(MALOAI) || !Array.isArray(LAISUAT) || MALOAI.length !== LAISUAT.length) {
            return res.status(400).send('Invalid data format');
        }
        try {
            // Thực hiện cập nhật
            await updateRateDeposit(LAISUAT, MALOAI);
            res.redirect('/cai_dat');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        res.redirect('/cai_dat');
    } else {
        res.status(400).send('Invalid action');
    }
};
const getModifyMinValue = async(req, res) => {
    const resultsTerm = await getActiveTermDeposit();
    const resultMininum = await getMininum();
    res.render('Settings_ModifyMin.ejs', {listTerm: resultsTerm, listMininum: resultMininum});
}
const postModifyMinValue = async (req, res) => {
    const action = req.body.action;

    if (action === 'confirm') {
        const {TEN, GIATRI } = req.body;

        // Kiểm tra xem MALOAI và LAISUAT có phải là mảng không và chúng có cùng độ dài không
        if (!Array.isArray(TEN) || !Array.isArray(GIATRI) || GIATRI.length !== TEN.length) {
            return res.status(400).send('Invalid data format');
        }
        try {
            // Thực hiện cập nhật
            await updateMininum(GIATRI, TEN);
            res.redirect('/cai_dat');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        res.redirect('/cai_dat');
    } else {
        res.status(400).send('Invalid action');
    }
};
const getSettings_Delete = async(req, res) => {
    const resultsTerm = await getActiveTermDeposit();
    const resultMininum = await getMininum();
    res.render('Settings_Delete.ejs', {listTerm: resultsTerm, listMininum: resultMininum});

}
const postDeleteTermDeposit = async(req, res) => {
    const action = req.body.action;
    if (action === 'confirm') {
        const blurredTerms = req.body.blurredTerms || [];
        try {
            // Thực hiện cập nhật
            await deleteTermDeposit(blurredTerms);
            res.redirect('/cai_dat');
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while saving the data');
        }
    } else if (action === 'cancel') {
        res.redirect('/cai_dat');
    } else {
        res.status(400).send('Invalid action');
    }
}

module.exports = {
    getDashboard,
    getTransactions,
    getDailyReports,
    getMonthlyReports,
    getSettings,
    getSettings_Delete,
    postDeleteTermDeposit,
    getModifyTermDeposit,
    postModifyTermDeposit,
    postDeleteTermDeposit,
    getModifyTermDeposit,
    postModifyTermDeposit,
    getDepositForm,
    postDepositForm,
    getCreateBookForm, 
    postCreateBookForm,
    postAddTermDeposit,
    getAddTermDeposit,
    getModifyMinValue,
    postModifyMinValue,
    getWithdrawForm,
    postWithdrawForm
}
