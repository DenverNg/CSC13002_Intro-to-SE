const connection = require('../config/database');

const getAllBooks = async () => {
    const [results, fields] = await connection.query(
        'SELECT S.MASO, KH.HOTEN, S.LOAI, S.SODU  FROM SOTIETKIEM S JOIN KHACHHANG KH ON S.MAKH = KH.MAKH WHERE S.TRANGTHAI = 1');
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
    return results;
}
const getTermDeposit = async() => {
    const [results, fields] = await connection.query(
        'SELECT KYHAN , MALOAI, LAISUAT FROM LOAI_SOTK');
    return results;
}

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
        'SELECT COUNT(*) AS COUNT FROM SOTIETKIEM WHERE MASO = ?', [MASO]);
    return results[0].COUNT;
}

module.exports = {
    getAllBooks,
    getDailyRP,
    getMonthlyRP,
    getTermDeposit,
    getNextMaSo,
    getTenKH,
    getLoaiTK,
    checkMaso
}