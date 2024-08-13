// Lưu trạng thái của hàng đã bị blur
const blurredRows = new Set();

// Blurs a row and adds a class to it
function blurTerm(index) {
    const row = document.getElementById(`term-${index}`);
    row.classList.add('blurred');
    blurredRows.add(index); // Lưu trạng thái blur
}

// Restores a blurred row to its normal state
function undoBlur(index) {
    const row = document.getElementById(`term-${index}`);
    row.classList.remove('blurred');
    blurredRows.delete(index); // Xóa trạng thái blur
}
function undoBlurAll() {
    for (const index of blurredRows) {
        undoBlur(index);
    }
}
// Function to get values of the first column from blurred rows as a string
function getBlurredFirstColumnValuesString() {
    // Lấy tất cả giá trị của cột đầu tiên từ các hàng bị blur và nối chúng thành một chuỗi
    return Array.from(blurredRows.values())
        .map(row => row.firstColumnValue)
        .join(', '); // Các giá trị cách nhau bởi dấu phẩy và khoảng trắng
}

// Example usage: log values of the first column from blurred rows as a string
function logBlurredFirstColumnValues() {
    console.log(getBlurredFirstColumnValuesString());
}