const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');
const notification = document.getElementById('notification');
const closeNotif = document.getElementById('closeNotif')
const btnNotif = document.getElementById('btnNotif');

checkbox.addEventListener('change', () => {
    clearInterval(timer);
    changeTheme();
});

let [isAutoTheme, setAutoThemeSet] = [false, (boolean) => { isAutoTheme = boolean }]

let timeChange = 0;
setTimeChange();

// Ставится интервал в зависимости от времени. Если isAutoTheme = true, то тема будет автоматически меняться
// Иначе вылетает уведомление о том что пора сменить тему (в определенное время).
let timer = setInterval(() => {
    if (isAutoTheme) {
        setThemeOnTime();
        setTimeChange();
    } else {
        getShowNotif();
        setTimeChange();
    }
}, timeChange * 60000)

// На крестик закрывается уведомления и удаляется таймер
closeNotif.onclick = () => {
    notification.classList.remove('open');
    clearInterval(timer)
}

// При нажатии на кнопку "переключиться" меняется тема и включается автоматическое переключение темы
btnNotif.onclick = () => {
    setAutoThemeSet(true)
    setThemeOnTime();
    notification.classList.remove('open');
}

// Функция для вычисления времени(в минутах) до следующей смены темы
function setTimeChange() {
    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();

    if (nowTime > 360 && nowTime < 1080) {
        timeChange = 1080 - nowTime;
    } else {
        nowTime > 360 ? timeChange = 1800 - nowTime : timeChange = 360 - nowTime;
    }
}

//Функция для показа уведомления.
function getShowNotif() {
    if (!notification.classList.contains('open')) {
        notification.classList.add('open');
    }
}

//Смена темы в зависимости от времени
function setThemeOnTime() {
    if (isAutoTheme) {
        const nowHours = new Date().getHours();
        if (nowHours >= 6 && nowHours <= 17) {
            document.documentElement.removeAttribute('theme');
        } else {
            document.documentElement.setAttribute('theme', 'dark');
        }
    }
}

//Для обычной смены темы через селектор
function changeTheme() {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
    }
}