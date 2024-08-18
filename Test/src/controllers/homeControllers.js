const connection = require('../config/database');
const { notify } = require('../routes/web');
const {getAllBooks, getDailyRP, getMonthlyRP, getAllTermDeposit, getActiveTermDeposit, getMininum, updateRateDeposit, updateMininum, deleteTermDeposit} = require('../services/CRUD');
const {getCurrentDate} = require('../public/js/date');
const { set, get } = require('express/lib/response');

const getNextMaSo = async () => {
    // Query to get the maximum existing MaSo
    const [rows, fields] = await connection.query("SELECT MAX(MASO) as maxMaSo FROM SOTIETKIEM");
    const maxMaSo = rows[0].maxMaSo;

    if (maxMaSo) {
        // Extract the numeric part from the maxMaSo, assuming the format is 'MSxxxxxx'
        const numericPart = parseInt(maxMaSo.slice(2), 10);

        // Increment the numeric part
        const nextNumericPart = (numericPart + 1).toString().padStart(6, '0');

        // Generate the new MaSo
        const newMaSo = `MS${nextNumericPart}`;

        return newMaSo;
    } else {
        // If no MaSo exists, start with 'MS000000'
        return 'MS000000';
    }
};

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
    newMaSo = await getNextMaSo();
    res.render('CreateBook_form.ejs', {newMaSo: newMaSo});
} 

const postCreateBookForm = async (req, res) => {
    const action = req.body.action;
    MASO = newMaSo;
    console.log("MASO LA: ", MASO);
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
    const maso = req.body.MASO;
    const ngaygui = req.body.NGAY;
    const sotien = req.body.SOTIEN;
    const query = 'CALL LAPPHIEUGUI(? ,?, ?);'
    connection.query(query, [maso, ngaygui, sotien], (err, result) => {
        res.send(req.body);
    })
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
    getDepositForm,
    postDepositForm,
    getCreateBookForm, 
    postCreateBookForm,
    postAddTermDeposit,
    getAddTermDeposit,
    getModifyMinValue,
    postModifyMinValue

}
