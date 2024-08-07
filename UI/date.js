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
