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
const deleteTermDeposit = async(nameTerm) =>{
    const [results, fields] = await connection.query(
        'UPDATE LOAI_SOTK\
        SET TRANGTHAI = 0\
        WHERE KYHAN = ?', [nameTerm]);
    console.log(results);
}
module.exports = {
    getAllBooks,
    getDailyRP,
    getMonthlyRP,
    getAllTermDeposit,
    getActiveTermDeposit,
    deleteTermDeposit
}