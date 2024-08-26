const connection = require('../config/database');

const getAllBooks = async () => {
    const [results, fields] = await connection.query(
        'SELECT S.MASO, KH.HOTEN, S.LOAI, S.SODU, KH.CMND  FROM SOTIETKIEM S JOIN KHACHHANG KH ON S.MAKH = KH.MAKH WHERE S.TRANGTHAI = 1');
    return results;
}
const getDailyRP = async(date) => {
    const [results, fields] = await connection.query(
        'CALL BAOCAO_NGAY(?)', [date]);
    return results[0];
}
const getMonthlyRP = async(month, type) => {
    const [results, fields] = await connection.query(
        'CALL BAOCAO_THANG(?,?)', [month, type]);
    return results[3];
}
const getAllTermDeposit = async() => {
    const [results, fields] = await connection.query(
        'SELECT KYHAN , MALOAI, LAISUAT FROM LOAI_SOTK');
    return results;
}
const getActiveTermDeposit = async() => {
    const [results, fields] = await connection.query(
        'SELECT KYHAN , MALOAI, LAISUAT FROM LOAI_SOTK WHERE TRANGTHAI = 1');
    return results;
}
const getMininum = async() => {
    const [results, fields] = await connection.query(
        'SELECT * FROM DONVI_TOITHIEU');
    return results;
}
const deleteTermDeposit = async(listID) =>{
    for (let i = 0; i < listID.length; i++) {
        id = listID[i];
        // Thực hiện cập nhật cho mỗi cặp giá trị
        await connection.query(
            'UPDATE LOAI_SOTK\
            SET TRANGTHAI = 0\
            WHERE KYHAN = ?', [id]);
    }
}
const updateRateDeposit = async (rates, terms) => {
    // Lặp qua từng cặp giá trị để thực hiện cập nhật
    for (let i = 0; i < rates.length; i++) {
        const rate = rates[i];
        const term = terms[i];

        // Thực hiện cập nhật cho mỗi cặp giá trị
        await connection.query(
            'UPDATE LOAI_SOTK SET LAISUAT = ?/100 WHERE MALOAI = ?',
            [rate, term]
        );
    }
};
const updateMininum = async (values, names) => {
    // Lặp qua từng cặp giá trị để thực hiện cập nhật
    for (let i = 0; i < values.length; i++) {
        const min = values[i];
        const name = names[i];

        // Thực hiện cập nhật cho mỗi cặp giá trị
        await connection.query(
            'UPDATE DONVI_TOITHIEU SET GIATRI = ? WHERE TEN = ?',
            [min, name]
        );
    }
}

// CREATE BOOK
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

// DEPOSIT FORM
const getTenKH = async(MASO) => {
    const [results, fields] = await connection.query(
        'SELECT KH.HOTEN FROM SOTIETKIEM S JOIN KHACHHANG KH ON S.MAKH = KH.MAKH WHERE S.MASO = ?', [MASO]);
    if (results.length == 0) {
        return "";
    }
    return results[0].HOTEN;
}

const getLoaiTK = async(MASO) =>{
    const [results, fields] = await connection.query(
        'SELECT LOAI FROM SOTIETKIEM WHERE MASO = ?', [MASO]);
    if (results.length > 0)
        return results[0].LOAI;
    else 
        return -1;
}

const checkMaso = async(MASO) => {
    const [results, fields] = await connection.query(
        'SELECT COUNT(*) AS COUNT, TRANGTHAI FROM SOTIETKIEM WHERE MASO = ?', [MASO]);
    if (results[0].COUNT == 0) {
        return -1; //MASO không tồn tại
    }
    if (results[0].TRANGTHAI == 0) {
        return 0; //MASO đã bị khóa
    }
    return results[0].COUNT;
}

const getMinMoney = async() => {
    const [results, fields] = await connection.query(
        'SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = "SOTIENGUI"');
    return results[0].GIATRI;
}

// WITHDRAW FORM
const getThoiGianToiThieu = async() => {
    const [results, fields] = await connection.query(
        'SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = "THOIGIAN"');
    return results[0].GIATRI;
}

const checkNgayRut = async(NGAY, MASO) => {
    const [results, fields] = await connection.query(
        'SELECT DATEDIFF(?, NGAYMOSO) AS DIFF FROM SOTIETKIEM WHERE MASO = ?', [NGAY, MASO]);
    const ThoiGianToiThieu = await getThoiGianToiThieu();
    if (results[0].DIFF >= ThoiGianToiThieu)
        return results[0].DIFF;
    return "ERROR";
}

const checkDaoHan = async(NGAY, MASO) => {
    const [results, fields] = await connection.query(
        'SELECT DATEDIFF(?, NGAYMOSO) AS DIFF, LOAI FROM SOTIETKIEM WHERE MASO = ?', [NGAY, MASO]);
    if (results[0].LOAI == 0)
        return -1;
    if (results[0].DIFF / results[0].LOAI >= 30)
        return 1;
    return 0;
}

const getLaiSuat = async(MASO) => {
    const [results, fields] = await connection.query(
        'SELECT LAISUAT FROM SOTIETKIEM S JOIN LOAI_SOTK L ON S.LOAI = L.MALOAI WHERE MASO = ?', [MASO]);
    return results[0].LAISUAT;
}

const calTienLai = async(MASO, NGAY, SOTIEN) => {
    const [results, fields] = await connection.query(
        'SELECT LAISUAT, NGAYMOSO, SODU, LOAI FROM SOTIETKIEM S JOIN LOAI_SOTK L ON S.LOAI = L.MALOAI WHERE MASO = ?', [MASO]);
    const LAISUAT = results[0].LAISUAT;
    const NGAYMOSO = results[0].NGAYMOSO;
    const SODU = results[0].SODU;
    const LOAI = results[0].LOAI;
    const DAOHAN = await checkDaoHan(NGAY, MASO);
    const [results1, fields1] = await connection.query(
        'SELECT DATEDIFF(?, ?) AS DIFF', [NGAY, NGAYMOSO]);
    const DIFF = results1[0].DIFF;

    if (LOAI == 0){
        if (SOTIEN > SODU)
            return "ERROR 0"; 
        if (DIFF < 30)
            return 0;
        return SOTIEN * LAISUAT;
    }
    else {
        if (SOTIEN != SODU)
            return "ERROR 1";
        if (DAOHAN >= 1)
            return SOTIEN * LAISUAT * DAOHAN;
        else 
            return "ERROR 2";
    }
}

const getAllType = async() => {
    const [results, fields] = await connection.query(
        'SELECT KYHAN FROM LOAI_SOTK');
    for (let i = 0; i < results.length; i++) {
        results[i] = results[i].KYHAN;
    }
    return results;
}

const getSoDu = async(MASO) => {
    const [results, fields] = await connection.query(
        'SELECT SODU FROM SOTIETKIEM WHERE MASO = ?', [MASO]);
    return results[0].SODU;
}
const getMaLoai = async () => {
  const [results, fields] = await connection.query(
    "SELECT MALOAI FROM LOAI_SOTK"
  );
  for (let i = 0; i < results.length; i++) {
    results[i] = results[i].MALOAI;
  }
  return results;
};

module.exports = {
  getAllBooks,
  getDailyRP,
  getMonthlyRP,
  getAllTermDeposit,
  getActiveTermDeposit,
  deleteTermDeposit,
  getMininum,
  updateRateDeposit,
  updateMininum,

  // CREATE BOOK
  getNextMaSo,

  // DEPOSIT FORM
  getTenKH,
  getLoaiTK,
  checkMaso,
  getMinMoney,

  // WITHDRAW FORM
  getThoiGianToiThieu,
  //allowWithdraw,
  getLaiSuat,
  checkNgayRut,
  checkDaoHan,
  calTienLai,

  // REPORT
  getAllType,
  getSoDu,
  getMaLoai,
};