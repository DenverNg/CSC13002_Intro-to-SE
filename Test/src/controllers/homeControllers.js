const connection = require("../config/database");
const {
  getAllBooks,
  getDailyRP,
  getMonthlyRP,
  getAllTermDeposit,
  getActiveTermDeposit,
  getMininum,
  updateRateDeposit,
  updateMininum,
  deleteTermDeposit,
  getNextMaSo,
  getTenKH,
  getLoaiTK,
  checkMaso,
  getMinMoney,
  checkDaoHan,
  checkNgayRut,
  calTienLai,
  getLaiSuat,
  getThoiGianToiThieu,
  getAllType,
  getSoDu,
  getMaLoai,
} = require("../services/CRUD");
const {
  getCurrentDate,
  getDateForReport,
  getMonthForReport,
  getMonthOnly,
} = require("../public/js/date");
const { set, get } = require("express/lib/response");

//Dashboard
const getDashboard = (req, res) => {
  res.render("Dashboard.ejs", { currentDate: getCurrentDate() });
};

//Transaction
const getTransactions = async (req, res) => {
  const results = await getAllBooks();
  res.render("Transactions.ejs", {
    listBooks: results,
    currentDate: getCurrentDate(),
  });
};
const getCreateBookForm = async (req, res) => {
  const newMaSo = await getNextMaSo();
  const types = await getAllType();
  const selectedType = types[0];

  res.render("CreateBook_form.ejs", {
    newMaSo: newMaSo,
    types: types,
    selectedType: selectedType,
  });
};

const postCreateBookForm = async (req, res) => {
  const action = req.body.action;
  const TIENTOITHIEU = await getMinMoney();

  if (req.body.MASO) MASO = req.body.MASO;
  else {
    maxMaSo = await getNextMaSo();
    const numericPart = parseInt(maxMaSo.slice(2) - 1, 10);

    // Increment the numeric part
    const nextNumericPart = (numericPart + 1).toString().padStart(6, "0");

    // Generate the new MaSo
    const newMaSo = `MS${nextNumericPart}`;

    MASO = newMaSo;
  }
  if (!action) {
    // Initial rendering of the verification page
    res.render("CreateBook_Verify.ejs", {
      MASO: MASO,
      LOAI: req.body.selectedType,
      TENKH: req.body.TENKH,
      CMND: req.body.CMND,
      DIACHI: req.body.DIACHI,
      SOTIEN: req.body.SOTIEN,
      NGAY: req.body.NGAY,
      TIENTOITHIEU: TIENTOITHIEU,
    });
  } else if (action === "confirm") {
    // Save data to the database
    const { MASO, LOAI, TENKH, CMND, DIACHI, NGAY, SOTIEN } = req.body;
    const query = "CALL MOSOTIETKIEM(?, ?, ?, ?, ?, ?,?)";
    try {
      await connection.query(query, [
        MASO,
        LOAI,
        TENKH,
        CMND,
        DIACHI,
        NGAY,
        SOTIEN,
      ]);
      res.redirect("/quan_ly_so");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    // Go back to the form without saving
    res.redirect("/taoso_form");
  }
};

//Daily Report

const getDailyReports = async (req, res) => {
  const results = await getDailyRP(getDateForReport());
  res.render("Daily_Report.ejs", {
    listDailyRP: results,
    currentDate: getDateForReport(),
  });
};

const postDailyReports = async (req, res) => {
  const action = req.body.action;
  if (action === "confirm") {
    // Save data to the database
    let date = req.body.date;
    const results = await getDailyRP(date);
    res.render("Daily_Report.ejs", {
      listDailyRP: results,
      currentDate: date,
    });
  }
};

const getMonthlyReports = async (req, res) => {
  types = await getAllType();
  const results = await getMonthlyRP(getMonthOnly(), "Không kỳ hạn");
  res.render("Monthly_Report.ejs", {
    listMonthlyRP: results,
    currentMonth: getMonthForReport(),
    types: types,
    selectedType: "Không kỳ hạn",
  });
};

const postMonthlyReports = async (req, res) => {
  const action = req.body.action;
  types = await getAllType();
  if (action === "confirm") {
    // Save data to the database
    const monthYear = req.body.date;
    const selectedType = req.body.selectedType;
    if (!selectedType || !monthYear) {
      return res.status(400).send("Tháng và loại kỳ hạn là bắt buộc.");
    }
    try {
      const [year, month] = monthYear.split("-");
      const monthNumber = parseInt(month, 10);

      // Fetch the report data based on month and type
      const results = await getMonthlyRP(monthNumber, selectedType);
      // console.log(results);
      // Render the report page with the fetched data and selected parameters
      res.render("Monthly_Report.ejs", {
        listMonthlyRP: results,
        currentMonth: req.body.date,
        selectedType: selectedType,
        types: types,
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
      res.status(500).send("Lỗi khi lấy dữ liệu báo cáo.");
    }
  } else {
    res.status(400).send("Hành động không hợp lệ.");
  }
};
const getPassword = (req, res) => {
  res.render("Password.ejs");
};

const getSettings = async (req, res) => {
  const resultsTerm = await getActiveTermDeposit();
  const resultMininum = await getMininum();
  res.render("Settings.ejs", {
    listTerm: resultsTerm,
    listMininum: resultMininum,
    currentDate: getCurrentDate(),
  });
};

const getDepositForm = async (req, res) => {
  res.render("Deposit_form.ejs");
};

const postDepositForm = async (req, res) => {
  const action = req.body.action;
  const TENKH = await getTenKH(req.body.MASO);
  const LOAI = await getLoaiTK(req.body.MASO);
  const CHECKMASO = await checkMaso(req.body.MASO);
  const TIENTOITHIEU = await getMinMoney();
  if (!action) {
    // Initial rendering of the verification page
    res.render("Deposit_Verify.ejs", {
      LOAI: LOAI,
      CHECKMASO: CHECKMASO,
      TIENTOITHIEU: TIENTOITHIEU,
      MASO: req.body.MASO,
      TENKH: TENKH,
      NGAY: req.body.NGAY,
      SOTIEN: req.body.SOTIEN,
    });
  } else if (action === "confirm") {
    // Save data to the database
    const { MASO, NGAY, SOTIEN } = req.body;
    const query = "CALL LAPPHIEUGUI(?, ?, ?)";
    try {
      await connection.query(query, [MASO, NGAY, SOTIEN]);
      res.redirect("/quan_ly_so");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    // Go back to the form without saving
    res.redirect("/guitien_form");
  }
};

const getWithdrawForm = async (req, res) => {
  res.render("Withdraw_form.ejs");
};

const postWithdrawForm = async (req, res) => {
  const action = req.body.action;
  const TENKH = await getTenKH(req.body.MASO);
  const LOAI = await getLoaiTK(req.body.MASO);
  const CHECKMASO = await checkMaso(req.body.MASO);
  const TIENTOITHIEU = await getMinMoney();
  const THOIGIANTOITHIEU = await getThoiGianToiThieu();
  const SODU = await getSoDu(req.body.MASO);

  const CHECKNGAYRUT = await checkNgayRut(req.body.NGAY, req.body.MASO);
  const CHECKDAOHAN = await checkDaoHan(req.body.NGAY, req.body.MASO);
  const CHECKTIENLAI = await calTienLai(
    req.body.MASO,
    req.body.NGAY,
    req.body.SOTIEN
  );

  LAISUAT = await getLaiSuat(req.body.MASO);
  const TIENLAIhidden = CHECKTIENLAI;

  if (CHECKTIENLAI === "ERROR 1" || CHECKTIENLAI === "ERROR 0") {
    const lai = await getLaiSuat(req.body.MASO);
    TIENLAI = lai * SODU;
    THUCNHAN = SODU + parseFloat(TIENLAI);
  } else if (CHECKTIENLAI === "ERROR 2") {
    TIENLAI = 0;
    THUCNHAN = 0;
  } else {
    TIENLAI = CHECKTIENLAI;
    THUCNHAN = parseFloat(req.body.SOTIEN) + parseFloat(TIENLAI);
  }

  if (
    CHECKNGAYRUT == "ERROR" ||
    (LOAI == 0 && CHECKDAOHAN != -1) ||
    CHECKDAOHAN == 0
  ) {
    LAISUAT = 0;
    TIENLAI = 0;
    THUCNHAN = 0;
  }

  if (isNaN(THUCNHAN)) {
    THUCNHAN = 0;
  }

  if (!action) {
    // Initial rendering of the verification page
    res.render("Withdraw_Verify.ejs", {
      LOAI: LOAI,
      CHECKMASO: CHECKMASO,
      TIENTOITHIEU: TIENTOITHIEU,
      LAISUAT: LAISUAT,
      TIENLAI: TIENLAI,
      THUCNHAN: THUCNHAN,
      CHECKNGAYRUT: CHECKNGAYRUT,
      CHECKDAOHAN: CHECKDAOHAN,
      THOIGIANTOITHIEU: THOIGIANTOITHIEU,
      TIENLAIhidden: TIENLAIhidden,
      SODU: SODU,

      MASO: req.body.MASO,
      TENKH: TENKH,
      NGAY: req.body.NGAY,
      SOTIEN: req.body.SOTIEN,
    });
  } else if (action === "confirm") {
    // Save data to the database
    const { MASO, NGAY, SOTIEN } = req.body;
    const query = "CALL LAPPHIEURUT(?, ?, ?)";
    try {
      await connection.query(query, [MASO, NGAY, SOTIEN]);
      res.redirect("/quan_ly_so");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    // Go back to the form without saving
    res.redirect("/ruttien_form");
  }
};

//Add new term deposit
const getAddTermDeposit = async (req, res) => {
  const resultsTerm = await getActiveTermDeposit();
  const resultMininum = await getMininum();
  res.render("Settings_Add.ejs", {
    listTerm: resultsTerm,
    listMininum: resultMininum,
    currentDate: getCurrentDate(),
  });
};

const postAddTermDeposit = async (req, res) => {
  const action = req.body.action;
  if (action === "confirm") {
    const { TENKYHAN, THOIGIANDAOHAN, LAISUAT } = req.body;
    const query =
      "INSERT INTO LOAI_SOTK(MALOAI, KYHAN, LAISUAT,TRANGTHAI)\
        VALUES (?,?,?,?)";
    try {
      await connection.query(query, [THOIGIANDAOHAN, TENKYHAN, LAISUAT, 1]);
      res.redirect("/cai_dat");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    res.redirect("/cai_dat");
  }
};
const getModifyTermDeposit = async (req, res) => {
  const resultsTerm = await getActiveTermDeposit();
  const resultMininum = await getMininum();
  res.render("Settings_ModifyRate.ejs", {
    listTerm: resultsTerm,
    listMininum: resultMininum,
    currentDate: getCurrentDate(),
  });
};

const postModifyTermDeposit = async (req, res) => {
  const action = req.body.action;

  if (action === "confirm") {
    const { MALOAI, LAISUAT } = req.body;

    // Kiểm tra xem MALOAI và LAISUAT có phải là mảng không và chúng có cùng độ dài không
    if (
      !Array.isArray(MALOAI) ||
      !Array.isArray(LAISUAT) ||
      MALOAI.length !== LAISUAT.length
    ) {
      return res.status(400).send("Invalid data format");
    }
    try {
      // Thực hiện cập nhật
      await updateRateDeposit(LAISUAT, MALOAI);
      res.redirect("/cai_dat");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    res.redirect("/cai_dat");
  } else {
    res.status(400).send("Invalid action");
  }
};
const getModifyMinValue = async (req, res) => {
  const resultsTerm = await getActiveTermDeposit();
  const resultMininum = await getMininum();
  res.render("Settings_ModifyMin.ejs", {
    listTerm: resultsTerm,
    listMininum: resultMininum,
    currentDate: getCurrentDate(),
  });
};
const postModifyMinValue = async (req, res) => {
  const action = req.body.action;

  if (action === "confirm") {
    const { TEN, GIATRI } = req.body;

    // Kiểm tra xem MALOAI và LAISUAT có phải là mảng không và chúng có cùng độ dài không
    if (
      !Array.isArray(TEN) ||
      !Array.isArray(GIATRI) ||
      GIATRI.length !== TEN.length
    ) {
      return res.status(400).send("Invalid data format");
    }
    try {
      // Thực hiện cập nhật
      await updateMininum(GIATRI, TEN);
      res.redirect("/cai_dat");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    res.redirect("/cai_dat");
  } else {
    res.status(400).send("Invalid action");
  }
};
const getSettings_Delete = async (req, res) => {
  const resultsTerm = await getActiveTermDeposit();
  const resultMininum = await getMininum();
  res.render("Settings_Delete.ejs", {
    listTerm: resultsTerm,
    listMininum: resultMininum,
    currentDate: getCurrentDate(),
  });
};
const postDeleteTermDeposit = async (req, res) => {
  const action = req.body.action;
  if (action === "confirm") {
    const blurredTerms = req.body.blurredTerms || [];
    try {
      // Thực hiện cập nhật
      await deleteTermDeposit(blurredTerms);
      res.redirect("/cai_dat");
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("An error occurred while saving the data");
    }
  } else if (action === "cancel") {
    res.redirect("/cai_dat");
  } else {
    res.status(400).send("Invalid action");
  }
};

module.exports = {
  getDashboard,
  getTransactions,
  getDailyReports,
  postDailyReports,
  getMonthlyReports,
  postMonthlyReports,
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
  postWithdrawForm,
  getPassword,
};
