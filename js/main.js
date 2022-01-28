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

/***/ "./src/js/Buttons/button.js":
/*!**********************************!*\
  !*** ./src/js/Buttons/button.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Button {\r\n  constructor(props) {\r\n    if (typeof props === 'object') {\r\n      this.text = props.text;\r\n      this.name = props.name;\r\n      this.color = props.color;\r\n      this.onClick = props.onClick;\r\n      this.value = props.value;\r\n    }\r\n  }\r\n\r\n  createEl() {\r\n    const div = document.createElement('div');\r\n    div.className = `btn ${this.name} ${this.color}`;\r\n    div.innerHTML = this.text;\r\n\r\n    div.onclick = (e) => {\r\n      this.onClick(this.value);\r\n    };\r\n    return div;\r\n  }\r\n\r\n  render() {\r\n    return this.createEl();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/Buttons/button.js?");

/***/ }),

/***/ "./src/js/Buttons/keyBoad.js":
/*!***********************************!*\
  !*** ./src/js/Buttons/keyBoad.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.js */ \"./src/js/Buttons/button.js\");\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../variables.js */ \"./src/js/variables.js\");\n\r\n\r\n\r\nclass KeyBoard {\r\n  constructor(callback) {\r\n    this.onClick = callback;\r\n  }\r\n\r\n  #generateButtons() {\r\n    return (_variables_js__WEBPACK_IMPORTED_MODULE_1__.MOCK_BTN.map((btn) => {\r\n      const button = new _button_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        name: btn.name,\r\n        color: btn.color,\r\n        text: btn.text,\r\n        value: btn.value,\r\n        onClick: this.onClick,\r\n      });\r\n\r\n      return button.render();\r\n    }));\r\n  }\r\n\r\n  render() {\r\n    return this.#generateButtons();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KeyBoard);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/Buttons/keyBoad.js?");

/***/ }),

/***/ "./src/js/display.js":
/*!***************************!*\
  !*** ./src/js/display.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Display {\r\n  constructor() {\r\n    this.state = 0;\r\n  }\r\n\r\n  static createEl() {\r\n    const resultText = document.createElement('p');\r\n\r\n    resultText.className = 'calc-screen__result';\r\n    resultText.id = 'resultText';\r\n    resultText.textContent = 0;\r\n\r\n    return resultText;\r\n  }\r\n\r\n  showResult(value) {\r\n    const resultScreenText = document.getElementById('resultText');\r\n\r\n    this.state = value;\r\n    resultScreenText.textContent = this.state;\r\n  }\r\n\r\n  render() {\r\n    return Display.createEl();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/display.js?");

/***/ }),

/***/ "./src/js/operations.js":
/*!******************************!*\
  !*** ./src/js/operations.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Operations)\n/* harmony export */ });\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ \"./src/js/display.js\");\n\r\n\r\nclass Operations extends _display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  constructor(callback) {\r\n    super();\r\n    this.showResult = callback;\r\n    this.result = 0;\r\n    this.prevNumber = 0;\r\n    this.currentNumber = 0;\r\n  }\r\n\r\n  createEl() {\r\n    const calculationText = document.createElement('p');\r\n    calculationText.className = 'calc-screen__calculations';\r\n    calculationText.id = 'calcText';\r\n    calculationText.textContent = this.state;\r\n    return calculationText;\r\n  }\r\n\r\n  showCalculations(value) {\r\n    const calculationScreenText = document.getElementById('calcText');\r\n    const operators = ['×', '÷', '-', '+'];\r\n    let element = value;\r\n\r\n    if (this.currentNumber.length === 6) {\r\n      return;\r\n    }\r\n\r\n    if (this.currentNumber === 0) {\r\n      this.currentNumber = '';\r\n    }\r\n\r\n    if (element === 'delete') {\r\n      const clone = this.currentNumber;\r\n\r\n      this.calculating(element);\r\n\r\n      if (this.currentNumber !== clone) {\r\n        this.showResult(this.currentNumber);\r\n      }\r\n\r\n      return;\r\n    }\r\n\r\n    switch (element) {\r\n      case 'reset':\r\n        element = 'c';\r\n        break;\r\n      case 'multiplication':\r\n        element = '×';\r\n        break;\r\n      case 'equal':\r\n        element = '=';\r\n        break;\r\n      case 'division':\r\n        element = '÷';\r\n        break;\r\n      case 'minus':\r\n        element = '-';\r\n        break;\r\n      case 'plus':\r\n        element = '+';\r\n        break;\r\n      case 'percent':\r\n        element = '%';\r\n        break;\r\n      case 'plus-minus':\r\n        element = '/';\r\n        break;\r\n      case 'dot':\r\n        element = '.';\r\n        break;\r\n      default:\r\n        element;\r\n    }\r\n\r\n    if (element === '/' && Number(this.currentNumber) === 0) {\r\n      return;\r\n    }\r\n\r\n    this.currentNumber += element;\r\n    this.calculating(element);\r\n\r\n    if (operators.includes(element)) {\r\n      this.prevNumber = this.currentNumber;\r\n      this.currentNumber = 0;\r\n      calculationScreenText.textContent = this.prevNumber;\r\n    }\r\n\r\n    if (operators.includes(element) && Number(this.result > 0)) {\r\n      calculationScreenText.textContent = this.result + element;\r\n    }\r\n\r\n    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {\r\n      this.showResult(this.currentNumber);\r\n    }\r\n  }\r\n\r\n  calculating(value) {\r\n    const operators = ['+', '-', '*', '÷', '×'];\r\n    const calculationScreenText = document.getElementById('calcText');\r\n\r\n    const cloneCurrentNumer = Number(this.currentNumber.slice(0, this.currentNumber.length - 1));\r\n\r\n    if (value === '=') {\r\n      calculationScreenText.textContent = this.prevNumber + this.currentNumber;\r\n\r\n      const calcStory = (this.prevNumber + this.currentNumber);\r\n      const calcLine = calcStory.slice(0, calcStory.length - 1).split('');\r\n\r\n      calcLine.forEach((element, i) => {\r\n        if (operators.includes(element)) {\r\n          const prevNumber = Number(calcLine.slice(operators.forEach((op) => {\r\n            calcLine.lastIndexOf(op, i);\r\n          }), i).join(''));\r\n          const nextNumber = Number(calcLine.slice(i + 1, operators.forEach((op) => {\r\n            calcLine.indexOf(op, i);\r\n          })).join(''));\r\n\r\n          switch (element) {\r\n            case '+':\r\n              this.showResult((prevNumber ? prevNumber + nextNumber : this.result + nextNumber));\r\n              this.result = (prevNumber ? prevNumber + nextNumber : this.result + nextNumber);\r\n              this.currentNumber = 0;\r\n              calculationScreenText.textContent = 0;\r\n              break;\r\n            case '-':\r\n              this.showResult(prevNumber ? prevNumber - nextNumber : this.result - nextNumber);\r\n              this.result = (prevNumber ? prevNumber - nextNumber : this.result - nextNumber);\r\n              this.currentNumber = 0;\r\n              calculationScreenText.textContent = 0;\r\n\r\n              break;\r\n            case '÷':\r\n              this.showResult(prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4\r\n                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);\r\n              this.result = (prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4\r\n                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);\r\n              this.currentNumber = 0;\r\n              calculationScreenText.textContent = 0;\r\n\r\n              break;\r\n            case '×':\r\n              this.showResult(prevNumber ? prevNumber * nextNumber : this.result * nextNumber);\r\n              this.result = (prevNumber ? prevNumber * nextNumber : this.result * nextNumber);\r\n              this.currentNumber = 0;\r\n              calculationScreenText.textContent = 0;\r\n\r\n              break;\r\n            default:\r\n              this.showResult(0);\r\n          }\r\n        }\r\n      });\r\n    }\r\n\r\n    if (value === 'c') {\r\n      this.currentNumber = 0;\r\n      this.prevNumber = 0;\r\n      this.result = 0;\r\n      this.showResult(0);\r\n      calculationScreenText.textContent = this.currentNumber;\r\n    }\r\n\r\n    if (value === '%') {\r\n      this.showResult(cloneCurrentNumer === 0 ? this.result / 100 : cloneCurrentNumer / 100);\r\n      this.result = cloneCurrentNumer / 100;\r\n      this.prevNumber = 0;\r\n      this.currentNumber = 0;\r\n    }\r\n\r\n    if (value === '/') {\r\n      if (Number(this.currentNumber) === 0) {\r\n        return;\r\n      }\r\n      const opposite = -cloneCurrentNumer;\r\n      this.currentNumber = opposite;\r\n    }\r\n\r\n    if (value === 'delete') {\r\n      if (Number(this.currentNumber) === 0 || this.currentNumber.length < 2) {\r\n        this.currentNumber = 0;\r\n      } else {\r\n        this.currentNumber = this.currentNumber.slice(0, this.currentNumber.length - 1);\r\n        console.log(this.currentNumber);\r\n      }\r\n    }\r\n  }\r\n\r\n  render() {\r\n    return this.createEl();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/js/operations.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ \"./src/js/display.js\");\n/* harmony import */ var _Buttons_keyBoad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Buttons/keyBoad.js */ \"./src/js/Buttons/keyBoad.js\");\n/* harmony import */ var _themeSelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./themeSelector.js */ \"./src/js/themeSelector.js\");\n/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operations.js */ \"./src/js/operations.js\");\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  class Calculator {\r\n    constructor(selector) {\r\n      this.selector = selector;\r\n      this.display = new _display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n      this.keyBoard = new _Buttons_keyBoad_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]((text) => this.click(text));\r\n      this.operations = new _operations_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]((value) => this.changeResult(value));\r\n    }\r\n\r\n    click(text) {\r\n      this.operations.showCalculations(text);\r\n    }\r\n\r\n    changeResult(value) {\r\n      this.display.showResult(value);\r\n    }\r\n\r\n    init() {\r\n      document.body.innerHTML += `\r\n      <div class=\"calc calc_${this.selector}\" id=\"calc\">\r\n      ${new _themeSelector_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]().render()}\r\n      <div class=\"calc__container\" id=\"calcContainer\">\r\n        <div class=\"calc-screen\" id=\"screen\">\r\n        </div>\r\n        <div class=\"calc-buttons\" id=\"calcButtons\">\r\n          </div>\r\n        </div>\r\n      </div>`;\r\n\r\n      document.getElementById('screen').append(this.operations.render(), this.display.render());\r\n\r\n      this.keyBoard.render().forEach((btn) => {\r\n        document.getElementById('calcButtons').append(btn);\r\n      });\r\n    }\r\n  }\r\n\r\n  const calc = new Calculator('test');\r\n\r\n  calc.init();\r\n});\r\n\n\n//# sourceURL=webpack://calculator/./src/js/script.js?");

/***/ }),

/***/ "./src/js/themeSelector.js":
/*!*********************************!*\
  !*** ./src/js/themeSelector.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ThemeSelector {\r\n  render() {\r\n    return (\r\n      `<div class=\"theme\">\r\n    <div class=\"theme__container\">\r\n      <input type=\"checkbox\" class=\"checkbox\" id=\"checkbox\" />\r\n      <label for=\"checkbox\" class=\"theme__selector\" id=\"toggleSelector\">\r\n        <i class=\"icon-sun\"></i>\r\n        <i class=\"icon-moon-1\"></i>\r\n        <div class=\"theme__ball\" id=\"toggleBall\"></div>\r\n      </label>\r\n    </div>\r\n  </div>`\r\n    );\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeSelector);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/themeSelector.js?");

/***/ }),

/***/ "./src/js/variables.js":
/*!*****************************!*\
  !*** ./src/js/variables.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TimePeriods\": () => (/* binding */ TimePeriods),\n/* harmony export */   \"ConvertTimeinMinutes\": () => (/* binding */ ConvertTimeinMinutes),\n/* harmony export */   \"NIGHT\": () => (/* binding */ NIGHT),\n/* harmony export */   \"DAY\": () => (/* binding */ DAY),\n/* harmony export */   \"MINUTE_IN_MS\": () => (/* binding */ MINUTE_IN_MS),\n/* harmony export */   \"MOCK_BTN\": () => (/* binding */ MOCK_BTN)\n/* harmony export */ });\nconst TimePeriods = { MORNING: 6, NIGHT: 18 };\r\nconst ConvertTimeinMinutes = { HOUR: 60, MORNING: 360, NIGHT: 1080, FULL_DAY: 1440 }\r\nconst NIGHT = 'night';\r\nconst DAY = 'day';\r\nconst MINUTE_IN_MS = 60000;\r\n\r\nconst MOCK_BTN = [\r\n  {\r\n    name: 'btn_ac',\r\n    color: 'btn_bg_gray',\r\n    text: 'c',\r\n    value: 'reset',\r\n  },\r\n  {\r\n    name: 'btn_plus-minus',\r\n    color: 'btn_bg_gray',\r\n    text: '<span class=\"btn__plus-minus\">/</span>',\r\n    value: 'plus-minus',\r\n  },\r\n  {\r\n    name: 'btn_percent',\r\n    color: 'btn_bg_gray',\r\n    text: '%',\r\n    value: 'percent',\r\n  },\r\n  {\r\n    name: 'btn_division',\r\n    color: 'btn_bg_blue',\r\n    text: '÷',\r\n    value: 'division',\r\n  },\r\n  {\r\n    name: 'btn_seven',\r\n    color: ' ',\r\n    text: '7',\r\n    value: 5,\r\n  },\r\n  {\r\n    name: 'btn_eigth',\r\n    color: ' ',\r\n    text: '8',\r\n    value: 8,\r\n  },\r\n  {\r\n    name: 'btn_nine',\r\n    color: ' ',\r\n    text: '9',\r\n    value: 9,\r\n  },\r\n  {\r\n    name: 'btn_multiplication',\r\n    color: 'btn_bg_blue',\r\n    text: '×',\r\n    value: 'multiplication',\r\n  },\r\n  {\r\n    name: 'btn_four',\r\n    color: ' ',\r\n    text: '4',\r\n    value: 4,\r\n  },\r\n  {\r\n    name: 'btn_five',\r\n    color: ' ',\r\n    text: '5',\r\n    value: 5,\r\n  },\r\n  {\r\n    name: 'btn_six',\r\n    color: ' ',\r\n    text: '6',\r\n    value: 6,\r\n  },\r\n  {\r\n    name: 'btn_minus',\r\n    color: 'btn_bg_blue',\r\n    text: '-',\r\n    value: 'minus',\r\n  },\r\n  {\r\n    name: 'btn_one',\r\n    color: ' ',\r\n    text: '1',\r\n    value: 1,\r\n  },\r\n  {\r\n    name: 'btn_two',\r\n    color: ' ',\r\n    text: '2',\r\n    value: 2,\r\n  },\r\n  {\r\n    name: 'btn_three',\r\n    color: ' ',\r\n    text: '3',\r\n    value: 3,\r\n  },\r\n  {\r\n    name: 'btn_plus',\r\n    color: 'btn_bg_blue',\r\n    text: '+',\r\n    value: 'plus',\r\n  },\r\n  {\r\n    name: 'btn_dot',\r\n    color: ' ',\r\n    text: '.',\r\n    value: 'dot',\r\n  },\r\n  {\r\n    name: 'btn_btn_zero',\r\n    color: ' ',\r\n    text: '0',\r\n    value: 0,\r\n  },\r\n  {\r\n    name: 'btn_delete',\r\n    color: ' ',\r\n    text: '<div class=\"btn__delete\" id=\"btnDelete\"><span>+</span></div>',\r\n    value: 'delete',\r\n  },\r\n  {\r\n    name: 'btn_equal',\r\n    color: 'btn_bg_blue',\r\n    text: '=',\r\n    value: 'equal',\r\n  },\r\n];\r\n\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/js/variables.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/script.js");
/******/ 	
/******/ })()
;