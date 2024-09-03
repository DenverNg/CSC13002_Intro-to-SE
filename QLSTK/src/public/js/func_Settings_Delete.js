// Lưu trạng thái của hàng đã bị blur
const blurredRows = new Set();

// Blurs a row and adds a class to it
function blurTerm(index) {
    const row = document.getElementById(`term-${index}`);
    row.classList.add('blurred');
    // Hide the "fa-times" button and show the "fa-undo" button
    const hideButton = row.querySelector('.fa-times');
    const showButton = row.querySelector('.fa-undo');
    hideButton.parentElement.style.display = 'none'; // Hide the button's parent (button itself)
    showButton.parentElement.style.display = 'inline-block'; // Show the undo button
    blurredRows.add(index); // Lưu trạng thái blur
}

// Restores a blurred row to its normal state
function undoBlur(index) {
    const row = document.getElementById(`term-${index}`);
    row.classList.remove('blurred');
    // Show the "fa-times" button and hide the "fa-undo" button
    const hideButton = row.querySelector('.fa-undo');
    const showButton = row.querySelector('.fa-times');
    hideButton.parentElement.style.display = 'none'; // Hide the undo button
    showButton.parentElement.style.display = 'inline-block'; // Show the blur button
    blurredRows.delete(index); // Xóa trạng thái blur
}

// Restores all blurred rows to their normal state
function undoBlurAll() {
    blurredRows.forEach(index => undoBlur(index));
}

// Submit form with blurred rows information
function submitDeleteForm() {
    const form = document.querySelector('.form-verify');
    

    // Tạo trường ẩn cho mỗi hàng bị mờ
    blurredRows.forEach(index => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'blurredTerms[]';  // Array để lưu tất cả các KYHAN bị mờ
        input.value = document.querySelector(`#term-${index} input[name="MALOAI[]"]`).value;
        input.classList.add('blurredTermInput');
        form.appendChild(input);
    });
    
    form.submit();
}