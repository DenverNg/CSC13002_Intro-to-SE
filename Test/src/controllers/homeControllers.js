const connection = require('../config/database');
// const { notify } = require('../routes/web');
const {getAllBooks, getDailyRP, getMonthlyRP, getTermDeposit, getNextMaSo} = require('../services/CRUD');
const {getCurrentDate} = require('../public/js/date');
const { set, get } = require('express/lib/response');

// const getNextMaSo = async () => {
//     // Query to get the maximum existing MaSo
//     const [rows, fields] = await connection.query("SELECT MAX(MASO) as maxMaSo FROM SOTIETKIEM");
//     const maxMaSo = rows[0].maxMaSo;

//     if (maxMaSo) {
//         // Extract the numeric part from the maxMaSo, assuming the format is 'MSxxxxxx'
//         const numericPart = parseInt(maxMaSo.slice(2), 10);

//         // Increment the numeric part
//         const nextNumericPart = (numericPart + 1).toString().padStart(6, '0');

//         // Generate the new MaSo
//         const newMaSo = `MS${nextNumericPart}`;

//         return newMaSo;
//     } else {
//         // If no MaSo exists, start with 'MS000000'
//         return 'MS000000';
//     }
// };


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
    MASO = req.body.MASO;
    console.log(MASO);
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
    console.log(results);  
}
const getMonthlyReports = async(req, res) => {
    // const results = await getMonthlyRP('2024-10-18'); //Chưa lấy được ngày từ user
    // res.render('Monthly_Report.ejs');
    res.send('Monthly Report');
}
const getSettings = async(req, res) => {
    const results = await getTermDeposit();
    res.render('Settings.ejs', {listTerm: results});
}
// const postSettings = async(req, res) => {
//     const action = req.body.action;

//     if (!action) {
//         // Initial rendering of the verification page
//         res.render('CreateBook_Verify.ejs', {
//             MASO: req.body.MASO,
//             LOAI: req.body.LOAI,
//             TENKH: req.body.TENKH,
//             CMND: req.body.CMND,
//             DIACHI: req.body.DIACHI,
//             SOTIEN: req.body.SOTIEN,
//             NGAY: req.body.NGAY
//         });

//     // Save data to the database
//     const { MASO, LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN } = req.body;
//     const query = 'CALL MOSOTIETKIEM(?, ?, ?, ?, ?, ?)';
//     try {
//     await connection.query(query, [LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN]);
//     // Redirect to management page or dashboard
//     res.redirect('/quan_ly_so');
//         await connection.query(query, [LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN]);
//         res.redirect('/quan_ly_so');
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).send('An error occurred while saving the data');
//     }
//     } else if (action === 'cancel') {
//         // Go back to the form without saving
//         res.redirect('/taoso_form');
//     }
// };
// const postSettings_Add = async(req, res) => {
//     const action = req.body.action;
//      // Initial rendering of the verification page
//     if (!action) {        
//          res.render('Settings_Add.ejs');
//     }
// }

// const postSettings_Moddify = async(req, res) => {
//     res.render("Settings_Modify.ejs");
// }
const getSettings_Delete = async(req, res) => {
    const action = req.body.action;
     // Initial rendering of the verification page
    if (!action) {        
        const results = await getTermDeposit();
         res.render('Settings_Delete.ejs', {listTerm: results});
    }
}




const getDepositForm = async(req, res) => {
    res.render('Deposit_form.ejs');
}

const getTenKH = async(MASO) => {
    const [results, fields] = await connection.query(
        'SELECT KH.HOTEN FROM SOTIETKIEM S JOIN KHACHHANG KH ON S.MAKH = KH.MAKH WHERE S.MASO = ?', [MASO]);
    return results[0].HOTEN;
}

const postDepositForm = async(req, res) => {

    const action = req.body.action;
    const TENKH = await getTenKH(req.body.MASO);
    console.log(TENKH);
    if (!action) {
        // Initial rendering of the verification page
        res.render('Deposit_Verify.ejs', {
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
    const maso = req.body.MASO;
    const ngaygui = req.body.NGAY;
    const sotien = req.body.SOTIEN;
    const query = 'CALL LAPPHIEUGUI(? ,?, ?);'
    connection.query(query, [maso, ngaygui, sotien], (err, result) => {
        res.send(req.body);
    })
}
module.exports = {
    getDashboard,
    getTransactions,
    getDailyReports,
    getMonthlyReports,
    getSettings,
    //postSettings_Add,
    getSettings_Delete,
    //postSettings_Moddify,
    getDepositForm,
    postDepositForm,
    getCreateBookForm, 
    postCreateBookForm,
    getWithdrawForm,
    postWithdrawForm
}
