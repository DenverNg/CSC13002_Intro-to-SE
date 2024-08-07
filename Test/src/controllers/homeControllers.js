const connection = require('../config/database');

const getDashboard = (req, res) => {
    res.send('Dashboard');
}
const getTransactions = async(req, res) => {
    return res.send('Transactions'); 
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
const getForm = async(req, res) => {
    res.render('guitien_form.ejs');
}
const postDeposit_Form = async(req, res) => {
    const ma = 999;
    const maso = req.body.MASO;
    const ngaygui = req.body.NGAY;
    const sotien = req.body.SOTIEN;
    console.log(maso, ngaygui, sotien);
    //const query = `CALL LAPPHIEUGUI('${maso}', ${ngaygui}, '${sotien})`;
    const query = `INSERT INTO PHIEUGUITIEN(MAPHIEUGUI, MASO, NGAYGUI, SOTIEN) VALUES(?, ?, ?, ?)`;
    connection.query(query, [ma, maso, ngaygui, sotien], (err, result) => {
        res.send(req.body);
    })
}
module.exports = {
    getDashboard,
    getTransactions,
    getDailyReports,
    getMonthlyReports,
    getSettings,
    getForm,
    postDeposit_Form
}
