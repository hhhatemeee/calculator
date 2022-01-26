'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.getElementById('checkbox');
  var bodyCalc = document.getElementById('calc').classList;
  var notification = document.getElementById('notification');
  var closeNotif = document.getElementById('closeNotif');
  var btnNotif = document.getElementById('btnNotif');
  var morningTime = 6;
  var nightTime = 18; //script for detect a device

  getDevice(); //I immediately start a timer to show a notification at a certain time

  getNotification(setTimeChange());
  checkbox.addEventListener('change', function () {
    changeTheme();
    notification.classList.remove('open');
    setAutoThemeSet(false);
    getNotification(setTimeChange());
    clearInterval(window.timer);
  });
  var _ref = [true, function (_boolean) {
    isAutoTheme = _boolean;
  }],
      isAutoTheme = _ref[0],
      setAutoThemeSet = _ref[1];
  var _ref2 = [false, function (_boolean2) {
    isDayTest = _boolean2;
  }],
      isDayTest = _ref2[0],
      setDayTest = _ref2[1];
  var _ref3 = [false, function (_boolean3) {
    isNightTest = _boolean3;
  }],
      isNightTest = _ref3[0],
      setNightTest = _ref3[1]; //timer with custom time

  function getNotification(time) {
    var themeContains = bodyCalc.contains('calc_theme_dark');
    setTimeout(function () {
      if (isAutoTheme) {
        setThemeOnTime();
      } else {
        if (themeContains && themeInfo() === 'night' || !themeContains && themeInfo() === 'day') {
          setThemeOnTime();
        } else {
          getShowNotif();
        }
      }
    }, time * 60000);
  } // Notifications are closed on the cross and the timer is deleted


  closeNotif.onclick = function () {
    notification.classList.remove('open');
  }; // When you click on the "switch" button, the theme changes and automatic theme switching is enabled


  btnNotif.onclick = function () {
    setAutoThemeSet(true);

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
    window.timer = setInterval(setThemeOnTime, setTimeChange() * 60000);
  }; // Function to calculate the time (in minutes) until the next topic change


  function setTimeChange() {
    var nowTime = new Date().getHours() * 60 + new Date().getMinutes();
    var timeChange = 0;

    if (nowTime > 360 && nowTime < 1080) {
      timeChange = 1080 - nowTime;
    } else {
      nowTime > 360 ? timeChange = 1800 - nowTime : timeChange = 360 - nowTime;
    }

    return timeChange;
  } //Function to show notification.


  function getShowNotif() {
    if (!notification.classList.contains('open')) {
      notification.classList.add('open');
    }
  } //Changing the topic depending on the time


  function setThemeOnTime(testHours) {
    if (isAutoTheme) {
      var nowHours = new Date().getHours();

      if (testHours) {
        nowHours = testHours;
      }

      if (nowHours >= morningTime && nowHours < nightTime) {
        bodyCalc.remove('calc_theme_dark');
        return 'day';
      } else {
        bodyCalc.add('calc_theme_dark');
        return 'night';
      }
    }
  }

  function themeInfo() {
    var nowHours = new Date().getHours();

    if (isNightTest) {
      nowHours = nightTime;
    }

    if (isDayTest) {
      nowHours = morningTime;
    }

    if (nowHours >= morningTime && nowHours < nightTime) {
      return 'day';
    } else {
      return 'night';
    }
  } //For normal theme change via selector


  function changeTheme() {
    bodyCalc.toggle('calc_theme_dark');
  }

  function getDevice() {
    var devices = ['windows', 'iphone', 'android', 'ipad', 'webos'];
    var uagent = navigator.userAgent.toLowerCase();
    devices.forEach(function (device) {
      if (uagent.search(device) > -1) {
        bodyCalc.add("calc-device--".concat(device));
      }
    });
  }

  window.setTime = function (time) {
    var themeContains = bodyCalc.contains('calc_theme_dark');

    if (time === 'day') {
      setNightTest(false);
      setDayTest(true);

      if (!isAutoTheme) {
        if (!themeContains && themeInfo() === 'day') {
          setThemeOnTime(morningTime);
        } else {
          getShowNotif();
        }
      } else {
        setThemeOnTime(morningTime);
      }
    }

    if (time === 'night') {
      setNightTest(true);
      setDayTest(false);

      if (!isAutoTheme) {
        if (themeContains && themeInfo() === 'night') {
          setThemeOnTime(morningTime);
        } else {
          getShowNotif();
        }
      } else {
        setThemeOnTime(nightTime);
      }
    }
  };
});