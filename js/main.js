/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables.js */ \"./src/js/variables.js\");\n\r\n;\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n  const checkbox = document.getElementById('checkbox');\r\n  const bodyCalc = document.getElementById('calc').classList;\r\n  const notification = document.getElementById('notification');\r\n  const closeNotif = document.getElementById('closeNotif')\r\n  const btnNotif = document.getElementById('btnNotif');\r\n\r\n\r\n  //I immediately start a timer to show a notification at a certain time\r\n  getNotification(setTimeChange());\r\n\r\n  getDevice();\r\n\r\n  checkbox.addEventListener('change', () => {\r\n    changeTheme();\r\n    notification.classList.remove('open');\r\n    setAutoThemeSet(false);\r\n    getNotification(setTimeChange());\r\n    clearInterval(window.timer);\r\n  });\r\n\r\n  let [isAutoTheme, setAutoThemeSet] = [true, (boolean) => { isAutoTheme = boolean }];\r\n  let [isDayTest, setDayTest] = [false, (boolean) => { isDayTest = boolean }];\r\n  let [isNightTest, setNightTest] = [false, (boolean) => { isNightTest = boolean }];\r\n\r\n  //timer with custom time\r\n  function getNotification(time) {\r\n    const themeContains = bodyCalc.contains('calc_theme_dark');\r\n\r\n    setTimeout(() => {\r\n      if (isAutoTheme) {\r\n        setThemeOnTime();\r\n\r\n        return;\r\n      }\r\n\r\n      if (themeContains && themeInfo() === _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT\r\n        || !themeContains && themeInfo() === _variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY) {\r\n        setThemeOnTime();\r\n\r\n        return;\r\n      }\r\n\r\n      getShowNotif();\r\n    }, time * _variables_js__WEBPACK_IMPORTED_MODULE_0__.MINUTE_IN_MS);\r\n  }\r\n\r\n  // Notifications are closed on the cross and the timer is deleted\r\n  closeNotif.onclick = () => {\r\n    notification.classList.remove('open');\r\n  }\r\n\r\n  // When you click on the \"switch\" button, the theme changes and automatic theme switching is enabled\r\n  btnNotif.onclick = () => {\r\n    setAutoThemeSet(true)\r\n    if (isDayTest) {\r\n      setThemeOnTime(_variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.MORNING);\r\n    }\r\n\r\n    if (isNightTest) {\r\n      setThemeOnTime(_variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.NIGHT);\r\n    }\r\n\r\n    if (!isDayTest && !isNightTest) {\r\n      setThemeOnTime();\r\n    }\r\n\r\n    notification.classList.remove('open');\r\n    window.timer = setInterval(setThemeOnTime, setTimeChange() * _variables_js__WEBPACK_IMPORTED_MODULE_0__.MINUTE_IN_MS)\r\n  }\r\n\r\n  // Function to calculate the time (in minutes) until the next topic change\r\n  function setTimeChange() {\r\n    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();\r\n    let timeChange = 0;\r\n\r\n    if (nowTime > _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.MORNING && nowTime < _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.NIGHT) {\r\n      timeChange = _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.NIGHT - nowTime;\r\n      return timeChange;\r\n    }\r\n\r\n    nowTime > _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.MORNING\r\n      ? timeChange = (_variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.FULL_DAY + _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.MORNING) - nowTime\r\n      : timeChange = _variables_js__WEBPACK_IMPORTED_MODULE_0__.ConvertTimeinMinutes.MORNING - nowTime;\r\n\r\n    return timeChange;\r\n  }\r\n\r\n  //Function to show notification.\r\n  function getShowNotif() {\r\n    if (!notification.classList.contains('open')) {\r\n      notification.classList.add('open');\r\n    }\r\n  }\r\n\r\n  //Changing the topic depending on the time\r\n  function setThemeOnTime(testHours) {\r\n    if (isAutoTheme) {\r\n      let nowHours = new Date().getHours();\r\n\r\n      if (testHours) {\r\n        nowHours = testHours;\r\n      }\r\n\r\n      if (nowHours >= _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.MORNING && nowHours < _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.NIGHT) {\r\n        bodyCalc.remove('calc_theme_dark')\r\n        return _variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY\r\n      }\r\n\r\n      bodyCalc.add('calc_theme_dark');\r\n      return _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT\r\n    }\r\n  }\r\n\r\n  function themeInfo() {\r\n    let nowHours = new Date().getHours();\r\n\r\n    if (isNightTest) {\r\n      nowHours = _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.NIGHT;\r\n    }\r\n\r\n    if (isDayTest) {\r\n      nowHours = _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.MORNING;\r\n    }\r\n\r\n    if (nowHours >= _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.MORNING && nowHours < _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.NIGHT) {\r\n      return _variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY;\r\n    }\r\n\r\n    return _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT;\r\n  }\r\n\r\n  //For normal theme change via selector\r\n  function changeTheme() {\r\n    bodyCalc.toggle('calc_theme_dark');\r\n  }\r\n\r\n  //Checking if the current topic does not match the time, then show a notification\r\n  function getNotAutoThemeInclude() {\r\n    const themeContains = bodyCalc.contains('calc_theme_dark');\r\n\r\n    if (!isAutoTheme) {\r\n      if (!themeContains && themeInfo() === _variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY) {\r\n        return;\r\n      }\r\n\r\n      if (themeContains && themeInfo() === _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT) {\r\n        return;\r\n      }\r\n\r\n      getShowNotif();\r\n      return;\r\n    }\r\n  }\r\n\r\n  function getDevice() {\r\n    const devices = ['windows', 'iphone', 'android', 'ipad', 'webos',];\r\n    const uagent = navigator.userAgent.toLowerCase();\r\n\r\n    devices.forEach(device => {\r\n      if (uagent.search(device) > -1) {\r\n        bodyCalc.add(`calc_device_${device}`);\r\n      }\r\n    })\r\n  }\r\n\r\n  window.setTime = (time) => {\r\n    const allowedArguments = [_variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY, _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT];\r\n\r\n    if (!time || !allowedArguments.includes(time)) {\r\n      return `Allowed arguments only ${allowedArguments.join(' or ')}`;\r\n    }\r\n\r\n    const isDay = time === _variables_js__WEBPACK_IMPORTED_MODULE_0__.DAY;\r\n    const isNight = time === _variables_js__WEBPACK_IMPORTED_MODULE_0__.NIGHT;\r\n\r\n    setDayTest(isDay);\r\n    setNightTest(isNight);\r\n\r\n    getNotAutoThemeInclude();\r\n\r\n    setThemeOnTime(isDay ? _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.MORNING : _variables_js__WEBPACK_IMPORTED_MODULE_0__.TimePeriods.NIGHT);\r\n  }\r\n})\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/js/script.js?");

/***/ }),

/***/ "./src/js/variables.js":
/*!*****************************!*\
  !*** ./src/js/variables.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TimePeriods\": () => (/* binding */ TimePeriods),\n/* harmony export */   \"ConvertTimeinMinutes\": () => (/* binding */ ConvertTimeinMinutes),\n/* harmony export */   \"NIGHT\": () => (/* binding */ NIGHT),\n/* harmony export */   \"DAY\": () => (/* binding */ DAY),\n/* harmony export */   \"MINUTE_IN_MS\": () => (/* binding */ MINUTE_IN_MS)\n/* harmony export */ });\nconst TimePeriods = { MORNING: 6, NIGHT: 18 };\r\nconst ConvertTimeinMinutes = { HOUR: 60, MORNING: 360, NIGHT: 1080, FULL_DAY: 1440 }\r\nconst NIGHT = 'night';\r\nconst DAY = 'day';\r\nconst MINUTE_IN_MS = 60000;\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/js/variables.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/js/script.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/variables.js");
/******/ 	
/******/ })()
;