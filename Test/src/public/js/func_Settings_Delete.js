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