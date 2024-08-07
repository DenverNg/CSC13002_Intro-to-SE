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

function inputClicked({id='', inputType='text'}) {
    const form = document.getElementById(id);
    var input = form.firstElementChild;
    var title = input.nextElementSibling;

    input.focus();
    title.style.animation = "inputTitleMoveUp ease 0.3s forwards";
    input.type = inputType;
    title.addEventListener("animationend", () => {
        title.style.fontSize = "17px";
        title.style.top = "calc(4%)";
        title.style.left = "15px";
        title.style.backgroundImage = "linear-gradient(0, #FFFF, #EEECFF)";
    }, { once: true });
}

function resetInput({input, title}) {
    title.style.animation = `inputTitleMoveDown ease 0.3s forwards`;
    input.type = "text";
    title.addEventListener("animationend", () => {
        title.style.animation = "none";
        title.style.fontSize = "28px";
        title.style.top = "calc(25% + 2px)";
        title.style.left = "0";
        title.style.backgroundImage = "none";
    }, { once: true });
}