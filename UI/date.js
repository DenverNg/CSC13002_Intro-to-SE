/* --- get date --- */
function getCurrentDate() {
    const currentDate = new Date();
  
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
  
    const dayOfMonth = currentDate.getDate();
  
    const month = currentDate.getMonth();
  
  
    const year = currentDate.getFullYear();
  
  
    const formattedDate = `${dayOfWeek},ngày ${dayOfMonth} tháng ${month} năm ${year}`;
  
    return formattedDate;
  }