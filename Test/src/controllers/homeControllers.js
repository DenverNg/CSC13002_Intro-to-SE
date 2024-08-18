const connection = require('../config/database');
const {getAllBooks, getDailyRP, getMonthlyRP, getAllTermDeposit, getActiveTermDeposit} = require('../services/CRUD');
//Dashboard
const getDashboard = (req, res) => {
    res.render('Dashboard.ejs');
}

//Transaction
const getTransactions = async(req, res) => {
    const results = await getAllBooks();
    res.render('Transactions.ejs', {listBooks: results});
}
const getCreateBookForm = async(req, res) => {
    res.render('CreateBook_form.ejs');
} 
const postCreateBookForm = async(req, res) => {
    let type = req.body.LOAI;
    let CustomerName = req.body.TENKH;
    let CustomerID = req.body.CMND;
    let Address = req.body.DIACHI;
    let OpenDate = req.body.NGAY;
    let Balance = req.body.SOTIEN;
    
    const query = 'CALL MOSOTIETKIEM(? ,?, ?, ?, ?, ?);'
    let [result,fields] = await connection.query(query, [type, CustomerName, CustomerID, Address, OpenDate, Balance]);
    res.send("Success");

}
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
    const results = await getAllTermDeposit();
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
        const results = await getActiveTermDeposit();
         res.render('Settings_Delete.ejs', {listTerm: results});
    }
}
const deleteTermDeposit = async(req, res) => {
    const action = req.body.action;
    if (action = 'deleteTerm') {
        const nameTerm = 'KHÔNG KỲ HẠN';
        await deleteTermDeposit(nameTerm);
        res.send('Success');
    }
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

module.exports = {
    getDashboard,
    getTransactions,
    getDailyReports,
    getMonthlyReports,
    getSettings,
    //postSettings_Add,
    getSettings_Delete,
    deleteTermDeposit,
    //postSettings_Moddify,
    getDepositForm,
    postDepositForm,
    getCreateBookForm, 
    postCreateBookForm
}
