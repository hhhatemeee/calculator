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
let [isDayTest, setDayTest] = [false, (boolean) => { isDayTest = boolean }]
let [isNightTest, setNightTest] = [false, (boolean) => { isNightTest = boolean }]

//таймер с кастомным временем
function getNotification(time) {
    setTimeout(() => {
        if (isAutoTheme) {
            setThemeOnTime();
        } else {
            if (document.documentElement.attributes["theme"] && themeInfo() === 'night'
                || !document.documentElement.attributes["theme"] && themeInfo() === 'day') {
                setThemeOnTime();
            } else {
                getShowNotif();

            }
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
    if (isDayTest) {
        setThemeOnTime(12);
    }
    if (isNightTest) {
        setThemeOnTime(19)
    }
    if (!isDayTest && !isNightTest) {
        setThemeOnTime()
    }
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
            return 'day'
        } else {
            document.documentElement.setAttribute('theme', 'dark');
            return 'night'
        }
    }
}

function themeInfo() {
    let nowHours = new Date().getHours();
    if (isNightTest) {
        nowHours = 20;
    }
    if (isDayTest) {
        nowHours = 12;
    }
    if (nowHours >= 6 && nowHours <= 17) {
        return 'day'
    } else {
        return 'night'
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
        setNightTest(false)
        setDayTest(true)
        if (!isAutoTheme) {
            if (document.documentElement.attributes["theme"] && themeInfo() === 'night'
                || !document.documentElement.attributes["theme"] && themeInfo() === 'day') {
                setThemeOnTime(12);
            } else {
                getShowNotif();
            }
        } else {
            setThemeOnTime(12)
        }
    }
    if (time === 'night') {
        setNightTest(true)
        setDayTest(false)
        if (!isAutoTheme) {
            if (document.documentElement.attributes["theme"] && themeInfo() === 'night'
                || !document.documentElement.attributes["theme"] && themeInfo() === 'day') {
                setThemeOnTime(12);
            } else {
                getShowNotif();
            }
        } else {
            setThemeOnTime(19)
        }
    }
}