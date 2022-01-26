import {
  TimePeriods,
  ConvertTimeinMinutes,
  NIGHT,
  DAY,
  MINUTE_IN_MS,
} from './variables.js';

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const bodyCalc = document.getElementById('calc').classList;
  const notification = document.getElementById('notification');
  const closeNotif = document.getElementById('closeNotif');
  const btnNotif = document.getElementById('btnNotif');

  // I immediately start a timer to show a notification at a certain time

  let isAutoTheme = true;
  const setAutoTheme = (boolean) => {
    isAutoTheme = boolean;
  };

  let isDayTest = false;
  const setDayTest = (boolean) => {
    isDayTest = boolean;
  };

  let isNightTest = false;
  const setNightTest = (boolean) => {
    isNightTest = boolean;
  };

  function getDevice() {
    const devices = ['windows', 'iphone', 'android', 'ipad', 'webos'];
    const uagent = navigator.userAgent.toLowerCase();

    devices.forEach((device) => {
      if (uagent.search(device) > -1) {
        bodyCalc.add(`calc_device_${device}`);
      }
    });
  }

  // For normal theme change via selector
  function changeTheme() {
    bodyCalc.toggle('calc_theme_dark');
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
      return DAY;
    }

    return NIGHT;
  }

  // Function to show notification.
  function getShowNotif() {
    if (!notification.classList.contains('open')) {
      notification.classList.add('open');
    }
  }

  // Checking if the current topic does not match the time, then show a notification
  function getNotAutoThemeInclude() {
    const themeContains = bodyCalc.contains('calc_theme_dark');

    if (!isAutoTheme) {
      if (!themeContains && themeInfo() === DAY) {
        return;
      }

      if (themeContains && themeInfo() === NIGHT) {
        return;
      }

      getShowNotif();
    }
  }

  // Changing the topic depending on the time
  function setThemeOnTime(testHours) {
    if (isAutoTheme) {
      let nowHours = new Date().getHours();

      if (testHours) {
        nowHours = testHours;
      }

      if (nowHours >= TimePeriods.MORNING && nowHours < TimePeriods.NIGHT) {
        bodyCalc.remove('calc_theme_dark');
        return DAY;
      }

      bodyCalc.add('calc_theme_dark');
      return NIGHT;
    }
    return false;
  }

  // timer with custom time
  function getNotification(time) {
    const themeContains = bodyCalc.contains('calc_theme_dark');

    setTimeout(() => {
      if (isAutoTheme) {
        setThemeOnTime();

        return;
      }

      if (themeContains && (themeInfo() === NIGHT
        || !themeContains) && themeInfo() === DAY) {
        setThemeOnTime();

        return;
      }

      getShowNotif();
    }, time * MINUTE_IN_MS);
  }

  // Function to calculate the time (in minutes) until the next topic change
  function setTimeChange() {
    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
    let timeChange = 0;

    if (nowTime > ConvertTimeinMinutes.MORNING && nowTime < ConvertTimeinMinutes.NIGHT) {
      timeChange = ConvertTimeinMinutes.NIGHT - nowTime;
      return timeChange;
    }

    timeChange = (nowTime > ConvertTimeinMinutes.MORNING
      ? ConvertTimeinMinutes.FULL_DAY + ConvertTimeinMinutes.MORNING - nowTime
      : ConvertTimeinMinutes.MORNING - nowTime);

    return timeChange;
  }

  getNotification(setTimeChange());

  getDevice();

  checkbox.addEventListener('change', () => {
    changeTheme();
    notification.classList.remove('open');
    setAutoTheme(false);
    getNotification(setTimeChange());
    clearInterval(window.timer);
  });

  // Notifications are closed on the cross and the timer is deleted
  closeNotif.onclick = () => {
    notification.classList.remove('open');
  };

  /* When you click on the "switch" button, the theme
  changes and automatic theme switching is enabled */
  btnNotif.onclick = () => {
    setAutoTheme(true);
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
    window.timer = setInterval(setThemeOnTime, setTimeChange() * MINUTE_IN_MS);
  };

  window.setTime = (time) => {
    const allowedArguments = [DAY, NIGHT];

    if (!time || !allowedArguments.includes(time)) {
      return `Allowed arguments only ${allowedArguments.join(' or ')}`;
    }

    const isDay = time === DAY;
    const isNight = time === NIGHT;

    setDayTest(isDay);
    setNightTest(isNight);

    getNotAutoThemeInclude();

    setThemeOnTime(isDay ? TimePeriods.MORNING : TimePeriods.NIGHT);

    return isDay ? DAY : NIGHT;
  };
});
