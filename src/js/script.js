'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');
    const bodyCalc = document.getElementById('calc').classList;
    const notification = document.getElementById('notification');
    const closeNotif = document.getElementById('closeNotif')
    const btnNotif = document.getElementById('btnNotif');

    const morningTime = 6;
    const nightTime = 18;
    const nightText = 'night';
    const dayText = 'day';


    //script for detect a device
    getDevice();

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
        }, time * 60000);
    }

    // Notifications are closed on the cross and the timer is deleted
    closeNotif.onclick = () => {
        notification.classList.remove('open');
    }

    // When you click on the "switch" button, the theme changes and automatic theme switching is enabled
    btnNotif.onclick = () => {
        setAutoThemeSet(true)
        if (isDayTest) {
            setThemeOnTime(morningTime);
        }
        if (isNightTest) {
            setThemeOnTime(nightTime);
        }
        if (!isDayTest && !isNightTest) {
            setThemeOnTime();
        }
        notification.classList.remove('open');
        window.timer = setInterval(setThemeOnTime, setTimeChange() * 60000)
    }

    // Function to calculate the time (in minutes) until the next topic change
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

            if (nowHours >= morningTime && nowHours < nightTime) {
                bodyCalc.remove('calc_theme_dark')
                return dayText
            } else {
                bodyCalc.add('calc_theme_dark');
                return nightText
            }
        }
    }

    function themeInfo() {
        let nowHours = new Date().getHours();
        if (isNightTest) {
            nowHours = nightTime;
        }
        if (isDayTest) {
            nowHours = morningTime;
        }
        if (nowHours >= morningTime && nowHours < nightTime) {
            return dayText;
        } else {
            return nightText;
        }
    }

    //For normal theme change via selector
    function changeTheme() {
        bodyCalc.toggle('calc_theme_dark');
    }

    function getDevice() {
        const devices = ['windows', 'iphone', 'android', 'ipad', 'webos',];
        const uagent = navigator.userAgent.toLowerCase();

        devices.forEach(device => {
            if (uagent.search(device) > -1) {
                bodyCalc.add(`calc-device--${device}`);
            }
        })
    }

    window.setTime = (time) => {
        const themeContains = bodyCalc.contains('calc_theme_dark');
        if (time === dayText) {
            setNightTest(false);
            setDayTest(true);
            if (!isAutoTheme) {
                if (!themeContains && themeInfo() === dayText) {
                    setThemeOnTime(morningTime);
                } else {
                    getShowNotif();
                }
            } else {
                setThemeOnTime(morningTime)
            }
        }
        if (time === nightText) {
            setNightTest(true);
            setDayTest(false);
            if (!isAutoTheme) {
                if (themeContains && themeInfo() === nightText) {
                    setThemeOnTime(morningTime);
                } else {
                    getShowNotif();
                }
            } else {
                setThemeOnTime(nightTime);
            }
        }
    }
})

