'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');
    const bodyCalc = document.getElementById('calc').classList;
    const notification = document.getElementById('notification');
    const closeNotif = document.getElementById('closeNotif')
    const btnNotif = document.getElementById('btnNotif');

    const TimePeriods = { MORNING: 6, NIGHT: 18 };
    const convertTimeinMinutes = { HOUR: 60, MORNING: 360, NIGHT: 1080, FULL_DAY: 1440 }
    const nightText = 'night';
    const dayText = 'day';
    const MINUTE_IN_MS = 60000;


    //I immediately start a timer to show a notification at a certain time
    getNotification(setTimeChange());

    checkbox.addEventListener('change', () => {
        changeTheme();
        notification.classList.remove('open');
        setAutoThemeSet(false);
        getNotification(setTimeChange());
        clearInterval(window.timer);
    });

    let [isAutoTheme, setAutoThemeSet] = [true, (boolean) => { isAutoTheme = boolean }];
    let [isDayTest, setDayTest] = [false, (boolean) => { isDayTest = boolean }];
    let [isNightTest, setNightTest] = [false, (boolean) => { isNightTest = boolean }];

    //timer with custom time
    function getNotification(time) {
        const themeContains = bodyCalc.contains('calc_theme_dark');

        setTimeout(() => {
            if (isAutoTheme) {
                setThemeOnTime();

                return;
            }

            if (themeContains && themeInfo() === nightText
                || !themeContains && themeInfo() === dayText) {
                setThemeOnTime();

                return;
            }

            getShowNotif();
        }, time * MINUTE_IN_MS);
    }

    // Notifications are closed on the cross and the timer is deleted
    closeNotif.onclick = () => {
        notification.classList.remove('open');
    }

    // When you click on the "switch" button, the theme changes and automatic theme switching is enabled
    btnNotif.onclick = () => {
        setAutoThemeSet(true)
        if (isDayTest) {
            setThemeOnTime(TimePeriods.MORNING);
        }

        if (isNightTest) {
            setThemeOnTime(TimePeriods.NIGHT);
        }

        if (!isDayTest && !isNightTest) {
            setThemeOnTime();
        }

        notification.classList.remove('open');
        window.timer = setInterval(setThemeOnTime, setTimeChange() * MINUTE_IN_MS)
    }

    // Function to calculate the time (in minutes) until the next topic change
    function setTimeChange() {
        const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
        let timeChange = 0;

        if (nowTime > convertTimeinMinutes.MORNING && nowTime < convertTimeinMinutes.NIGHT) {
            timeChange = convertTimeinMinutes.NIGHT - nowTime;
            return timeChange;
        }

        nowTime > convertTimeinMinutes.MORNING
            ? timeChange = (convertTimeinMinutes.FULL_DAY + convertTimeinMinutes.MORNING) - nowTime
            : timeChange = convertTimeinMinutes.MORNING - nowTime;

        return timeChange;
    }

    //Function to show notification.
    function getShowNotif() {
        if (!notification.classList.contains('open')) {
            notification.classList.add('open');
        }
    }

    //Changing the topic depending on the time
    function setThemeOnTime(testHours) {
        if (isAutoTheme) {
            let nowHours = new Date().getHours();

            if (testHours) {
                nowHours = testHours;
            }

            if (nowHours >= TimePeriods.MORNING && nowHours < TimePeriods.NIGHT) {
                bodyCalc.remove('calc_theme_dark')
                return dayText
            }

            bodyCalc.add('calc_theme_dark');
            return nightText
        }
    }

    function themeInfo() {
        let nowHours = new Date().getHours();

        if (isNightTest) {
            nowHours = TimePeriods.NIGHT;
        }

        if (isDayTest) {
            nowHours = TimePeriods.MORNING;
        }

        if (nowHours >= TimePeriods.MORNING && nowHours < TimePeriods.NIGHT) {
            return dayText;
        }

        return nightText;
    }

    //For normal theme change via selector
    function changeTheme() {
        bodyCalc.toggle('calc_theme_dark');
    }

    //Checking if the current topic does not match the time, then show a notification
    function getNotAutoThemeInclude() {
        const themeContains = bodyCalc.contains('calc_theme_dark');

        if (!isAutoTheme) {
            if (!themeContains && themeInfo() === dayText) {
                return;
            }

            if (themeContains && themeInfo() === nightText) {
                return;
            }

            getShowNotif();
            return;
        }
    }

    window.setTime = (time) => {

        if (time === dayText) {
            setNightTest(false);
            setDayTest(true);

            getNotAutoThemeInclude()
            setThemeOnTime(TimePeriods.MORNING)
        }

        if (time === nightText) {
            setNightTest(true);
            setDayTest(false);

            getNotAutoThemeInclude()
            setThemeOnTime(TimePeriods.NIGHT);
        }
    }
})

