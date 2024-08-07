const connection = require('../config/database');
//Dashboard
const getDashboard = (req, res) => {
    res.send('Dashboard');
}

//Transaction
const getTransactions = async(req, res) => {
    connection.query(
        'SELECT * FROM SOTIETKIEM',
        function (err, results) {
          return res.send(results)
        }
      );
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
    connection.query(query, [type, CustomerName, CustomerID, Address, OpenDate, Balance], (err, result) => {
        console.log(query);
        res.send(req.body);
    })

}

const getDailyReports = async(req, res) => {
    res.send('Daily Reports');
}
const getMonthlyReports = async(req, res) => {
    res.send('Monthly Reports');
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
