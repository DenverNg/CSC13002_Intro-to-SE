const connection = require('../config/database');

const getAllBooks = async () => {
    const [results, fields] = await connection.query(
        'SELECT S.MASO, KH.HOTEN, S.TRANGTHAI, S.SODU  FROM SOTIETKIEM S JOIN KHACHHANG KH ON S.MAKH = KH.MAKH');
    return results;
}
module.exports = {
    getAllBooks
}