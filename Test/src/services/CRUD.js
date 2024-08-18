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
const getMininum = async() => {
    const [results, fields] = await connection.query(
        'SELECT * FROM DONVI_TOITHIEU');
    return results;
}
const deleteTermDeposit = async(nameTerm) =>{
    const [results, fields] = await connection.query(
        'UPDATE LOAI_SOTK\
        SET TRANGTHAI = 0\
        WHERE KYHAN = ?', [nameTerm]);
    console.log(results);
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
module.exports = {
    getAllBooks,
    getDailyRP,
    getMonthlyRP,
    getAllTermDeposit,
    getActiveTermDeposit,
    deleteTermDeposit,
    getMininum,
    updateRateDeposit,
    updateMininum
}