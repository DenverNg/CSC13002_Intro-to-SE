const connection = require('../config/database');
const {getAllBooks, getDailyRP, getMonthlyRP} = require('../services/CRUD');
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
    console.log(results);  
}
const getMonthlyReports = async(req, res) => {
    // const results = await getMonthlyRP('2024-10-18'); //Chưa lấy được ngày từ user
    // res.render('Monthly_Report.ejs');
    res.send('Monthly Report');
}
const getSettings = async(req, res) => {
    res.send('Settings');
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
    getDepositForm,
    postDepositForm,
    getCreateBookForm, 
    postCreateBookForm
}
