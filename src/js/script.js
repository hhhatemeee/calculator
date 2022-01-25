const checkbox = document.getElementById('checkbox');
const bodyCalc = document.getElementById('calc');
const notification = document.getElementById('notification');
const closeNotif = document.getElementById('closeNotif')
const btnNotif = document.getElementById('btnNotif');

//Сразу завожу таймер на показ уведомления в определеное время
getNotification(setTimeChange());

checkbox.addEventListener('change', () => {
    changeTheme();
    notification.classList.remove('open');
    setAutoThemeSet(false);
    getNotification(setTimeChange())
    clearInterval(window.timer)
});

let [isAutoTheme, setAutoThemeSet] = [true, (boolean) => { isAutoTheme = boolean }]

//таймер с кастомным временем
function getNotification(time) {
    setTimeout(() => {
        if (isAutoTheme) {
            setThemeOnTime();
        } else {
            getShowNotif();
        }
    }, time * 60000);
}

// На крестик закрывается уведомления и удаляется таймер
closeNotif.onclick = () => {
    notification.classList.remove('open');
}

// При нажатии на кнопку "переключиться" меняется тема и включается автоматическое переключение темы
btnNotif.onclick = () => {
    setAutoThemeSet(true)
    setThemeOnTime();
    notification.classList.remove('open');
    window.timer = setInterval(setThemeOnTime, setTimeChange() * 60000)
}

// Функция для вычисления времени(в минутах) до следующей смены темы
function setTimeChange() {
    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
    let timeChange = 0;

    if (nowTime > 360 && nowTime < 1080) {
        timeChange = 1080 - nowTime;
    } else {
        nowTime > 360 ? timeChange = 1800 - nowTime : timeChange = 360 - nowTime;
    }
    return timeChange;
}

//Функция для показа уведомления.
function getShowNotif() {
    if (!notification.classList.contains('open')) {
        notification.classList.add('open');
    }
}

//Смена темы в зависимости от времени
function setThemeOnTime(testHours) {
    if (isAutoTheme) {
        let nowHours = new Date().getHours();

        if (testHours) {
            nowHours = testHours;
        }

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

window.setTime = (time) => {
    if (time === 'day') {
        if (!isAutoTheme) {
            getShowNotif();
        } else {
            setThemeOnTime(12)
        }
    }
    if (time === 'night') {
        if (!isAutoTheme) {
            getShowNotif();
        } else {
            setThemeOnTime(19)
        }
    }
}