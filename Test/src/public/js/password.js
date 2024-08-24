document.addEventListener('DOMContentLoaded', () => {
let correct_password = "123456789";
let pass = document.getElementById("password");
let cover = document.querySelector('.password')
function checkPassword() {
    if (correct_password == pass.value)
        return true;
}

let eyeicon = document.getElementById("eyeicon");

pass.addEventListener('input',()=>{
    if(checkPassword())
        window.location.href = '/cai_dat';
})

eyeicon.addEventListener('click',()=>{
    if (pass.type == "password")
    {
        password.type = "text";
        eyeicon.textContent = 'visibility'; 
    }
    else
    {
        password.type = "password";
        eyeicon.textContent = 'visibility_off';
    }
})
})