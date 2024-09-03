function Validator (options) {

    function validate (inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var messageElement = inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            messageElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            messageElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    inputElement.parentElement.classList.remove('invalid');
                    var messageElement = inputElement.parentElement.querySelector(options.errorSelector);
                    messageElement.innerText = '';
                }
            }
        });
        
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}