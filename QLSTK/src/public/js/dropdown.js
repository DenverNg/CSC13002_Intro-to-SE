const { getAllType } = require('../../services/CRUD');

document.addEventListener('DOMContentLoaded', () => {

function updateName(selectedLi) {
    searchInp.value = "";
    addType(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");


let types = ["Không kỳ hạn","Kỳ hạn 3 tháng","Kỳ hạn 6 tháng","Kỳ hạn 8 tháng","Kỳ hạn 10 tháng", "Kỳ hạn 12 tháng","Kỳ hạn 16 tháng","Kỳ hạn 20 tháng"];
// async function fetchTypes(){
//     let types = await getAllType();
//     addType();
// }


function addType(selectedType) {
    options.innerHTML = "";
    types.forEach(type => {
        let isSelected = type == selectedType ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${type}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addType();
const firstOption = options.querySelector('li');
updateName(firstOption);
searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = types.filter(data => {
        return data.toLowerCase().includes(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Không có loại kỳ hạn cần tìm kiếm:(((</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
options.addEventListener('', (event) => {
    if (event.target.tagName === 'LI') {
      updateName(event.target);
    }})
options.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      updateName(event.target);
    }})
});