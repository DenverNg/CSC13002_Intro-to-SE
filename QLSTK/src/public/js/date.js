const e = require("express");
const { get } = require("express/lib/response");

/* --- get date --- */
function getCurrentDate() {
    const currentDate = new Date();
  
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
  
    const dayOfMonth = currentDate.getDate();
  
    const month = currentDate.getMonth()+1;
  
  
    const year = currentDate.getFullYear();
  
  
    const formattedDate = `${dayOfWeek}, ngày ${dayOfMonth} tháng ${month} năm ${year}`;
  
    return formattedDate;
  }

function getDateForReport() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getMonthForReport(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based

    return `${year}-${month}`;  
}

function getMonthOnly(){
    const date = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based

    return `${month}`;       
}

module.exports = {getCurrentDate,getDateForReport, getMonthForReport, getMonthOnly};