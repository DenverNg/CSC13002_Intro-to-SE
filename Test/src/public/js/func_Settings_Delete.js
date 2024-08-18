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
    const values = [];
    for (const index of blurredRows) {
        const row = document.getElementById(`term-${index}`);
        const firstColumnValue = row.children[0].textContent;
        values.push(firstColumnValue);
    }
    return values.join(', ');
}

// Example usage: log values of the first column from blurred rows as a string
function logBlurredFirstColumnValues() {
    console.log(getBlurredFirstColumnValuesString());
}