"use strict";

var checkbox = document.getElementById('checkbox');
var bodyCalc = document.getElementById('calc');
var notification = document.getElementById('notification');
var closeNotif = document.getElementById('closeNotif');
var btnNotif = document.getElementById('btnNotif'); //Сразу завожу таймер на показ уведомления в определеное время

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
    setNightTest = _ref3[1]; //таймер с кастомным временем

function getNotification(time) {
  setTimeout(function () {
    if (isAutoTheme) {
      setThemeOnTime();
    } else {
      getShowNotif();
    }
  }, time * 60000);
} // На крестик закрывается уведомления и удаляется таймер


closeNotif.onclick = function () {
  notification.classList.remove('open');
}; // При нажатии на кнопку "переключиться" меняется тема и включается автоматическое переключение темы


btnNotif.onclick = function () {
  setAutoThemeSet(true);

  if (isDayTest) {
    setThemeOnTime(12);
  }

  if (isNightTest) {
    setThemeOnTime(19);
  }

  if (!isDayTest && !isNightTest) {
    setThemeOnTime();
  }

  notification.classList.remove('open');
  window.timer = setInterval(setThemeOnTime, setTimeChange() * 60000);
}; // Функция для вычисления времени(в минутах) до следующей смены темы


function setTimeChange() {
  var nowTime = new Date().getHours() * 60 + new Date().getMinutes();
  var timeChange = 0;

  if (nowTime > 360 && nowTime < 1080) {
    timeChange = 1080 - nowTime;
  } else {
    nowTime > 360 ? timeChange = 1800 - nowTime : timeChange = 360 - nowTime;
  }

  return timeChange;
} //Функция для показа уведомления.


function getShowNotif() {
  if (!notification.classList.contains('open')) {
    notification.classList.add('open');
  }
} //Смена темы в зависимости от времени


function setThemeOnTime(testHours) {
  if (isAutoTheme) {
    var nowHours = new Date().getHours();

    if (testHours) {
      nowHours = testHours;
    }

    if (nowHours >= 6 && nowHours <= 17) {
      document.documentElement.removeAttribute('theme');
    } else {
      document.documentElement.setAttribute('theme', 'dark');
    }
  }
} //Для обычной смены темы через селектор


function changeTheme() {
  if (document.documentElement.hasAttribute('theme')) {
    document.documentElement.removeAttribute('theme');
  } else {
    document.documentElement.setAttribute('theme', 'dark');
  }
}

window.setTime = function (time) {
  if (time === 'day') {
    setNightTest(false);
    setDayTest(true);

    if (!isAutoTheme) {
      getShowNotif();
    } else {
      setThemeOnTime(12);
    }
  }

  if (time === 'night') {
    setNightTest(true);
    setDayTest(false);

    if (!isAutoTheme) {
      getShowNotif();
    } else {
      setThemeOnTime(19);
    }
  }
};