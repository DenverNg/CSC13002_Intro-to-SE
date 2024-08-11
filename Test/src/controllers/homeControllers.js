const connection = require('../config/database');
const { notify } = require('../routes/web');
const {getAllBooks, getDailyRP, getMonthlyRP} = require('../services/CRUD');
const {getCurrentDate} = require('../public/js/date');

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
    if (req.body.confirm === 'true') {
        // If the confirmation is true, save the data to the database
        let type = req.body.LOAI;
        let CustomerName = req.body.TENKH;
        let CustomerID = req.body.CMND;
        let Address = req.body.DIACHI;
        let OpenDate = req.body.NGAY;
        let Balance = req.body.SOTIEN;

        const query = 'CALL MOSOTIETKIEM(? ,?, ?, ?, ?, ?);';
        await connection.query(query, [type, CustomerName, CustomerID, Address, OpenDate, Balance]);
        
        // After saving, you might want to redirect to another page, like a success page or back to the dashboard
        res.send("Success");
    } else {
        // Pass the form data to the verification page
        res.render('CreateBook_Verify.ejs', {
            newMaSo: req.body.MASO,
            type: req.body.LOAI,
            CustomerName: req.body.TENKH,
            CustomerID: req.body.CMND,
            Address: req.body.DIACHI,
            OpenDate: req.body.NGAY,
            Balance: req.body.SOTIEN
        });
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
