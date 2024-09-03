document.addEventListener("DOMContentLoaded", () => {
    const groups = document.querySelectorAll(".form-group");
    
    groups.forEach(element => {
        var input = element.firstElementChild;
        var title = input.nextElementSibling;

        input.addEventListener("blur", () => {
            if (input.value == "") {
                resetInput({input, title});
            }
        });
    });
})

document.addEventListener("DOMContentLoaded", () => {
    const groups = document.querySelectorAll(".inp-createbook");
    
    groups.forEach(element => {
        var input = element.firstElementChild;
        var title = input.nextElementSibling;

        input.addEventListener("blur", () => {
            if (input.value == "") {
                resetInput({input, title, fontSize: '20px', top: '30% + 1px', animation: 'inputTitleMoveDown_createbook'});
            }
        });
    });
})

function inputClicked({id='', inputType='text', fontSize='17px', top='4%', animation='inputTitleMoveUp'}) {
    const form = document.getElementById(id);
    var input = form.firstElementChild;
    var title = input.nextElementSibling;

    input.focus();
    title.style.animation = `${animation} ease 0.3s forwards`;
    input.type = inputType;
    title.addEventListener("animationend", () => {
        title.style.fontSize = fontSize;
        title.style.top = `calc(${top})`;
        title.style.left = "15px";
        title.style.backgroundImage = "linear-gradient(0, #FFFF, #EEECFF)";
    }, { once: true });
}

function resetInput({input, title, fontSize='28px', top='25% + 2px', animation='inputTitleMoveDown'}) {
    title.style.animation = `${animation} ease 0.3s forwards`;
    input.type = "text";
    title.addEventListener("animationend", () => {
        title.style.animation = "none";
        title.style.fontSize = fontSize;
        title.style.top = `calc(${top})`;
        title.style.left = "0";
        title.style.backgroundImage = "none";
    }, { once: true });
}