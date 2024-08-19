
function toast(
    {title='',
    desc='',
    type='success',
    duration=3000}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
    
        const autoRemoveID = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 600);

        toast.onclick = function (e) {
            if (e.target.closest(".toast--close")) {
                clearTimeout(autoRemoveID);
                main.removeChild(toast);
            }
        }

        const icons = {
            success: 'fa-solid fa-circle-check',
            error: 'fa-solid fa-circle-xmark',
            info: 'fa-solid fa-circle-exclamation'
        };
        const icon = icons[type];

        toast.classList.add('toast',`toast--${type}`);

        const delay = (duration / 1000).toFixed(2);
        toast.style.animation = `slideFromLeft ease 0.5s, fadeOut linear 0.5s ${delay}s forwards`;

        toast.innerHTML=`
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__desc">${desc}</p> 
                </div>
                <div class="toast--close">
                    <i class="fa-solid fa-xmark"></i>
                </div>`;

        main.appendChild(toast);
    }
}
