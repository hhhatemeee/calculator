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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../get.js */ \"./src/js/get.js\");\n\r\n\r\nclass Button {\r\n  constructor(props) {\r\n    this.name = (0,_get_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, 'name', '0');\r\n    this.color = (0,_get_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, 'color', '0');\r\n    this.text = (0,_get_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, 'text', '0');\r\n    this.value = (0,_get_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, 'value', '0');\r\n    this.onClick = (0,_get_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, 'onClick', () => console.log('Что-то пошло не так'));\r\n  }\r\n\r\n  createEl() {\r\n    const div = document.createElement('div');\r\n    div.className = `btn ${this.name} ${this.color}`;\r\n    div.innerHTML = this.text;\r\n\r\n    div.onclick = () => this.onClick(this.value);\r\n    return div;\r\n  }\r\n\r\n  render() {\r\n    return this.createEl();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/Buttons/button.js?");

/***/ }),

/***/ "./src/js/Buttons/keyBoad.js":
/*!***********************************!*\
  !*** ./src/js/Buttons/keyBoad.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.js */ \"./src/js/Buttons/button.js\");\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../variables.js */ \"./src/js/variables.js\");\n/* harmony import */ var _callFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../callFunction.js */ \"./src/js/callFunction.js\");\n\r\n\r\n\r\n\r\nclass KeyBoard {\r\n  constructor(props) {\r\n    this.onClick = _callFunction_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].call(this, props.callBack);\r\n  }\r\n\r\n  #generateButtons() {\r\n    return (_variables_js__WEBPACK_IMPORTED_MODULE_1__.MOCK_BTN.map((btn) => {\r\n      const button = new _button_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        name: btn.name,\r\n        color: btn.color,\r\n        text: btn.text,\r\n        value: btn.value,\r\n        onClick: this.onClick,\r\n      });\r\n\r\n      return button.render();\r\n    }));\r\n  }\r\n\r\n  render() {\r\n    return this.#generateButtons();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KeyBoard);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/Buttons/keyBoad.js?");

/***/ }),

/***/ "./src/js/Calculator.js":
/*!******************************!*\
  !*** ./src/js/Calculator.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Calculator)\n/* harmony export */ });\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ \"./src/js/display.js\");\n/* harmony import */ var _Buttons_keyBoad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Buttons/keyBoad.js */ \"./src/js/Buttons/keyBoad.js\");\n/* harmony import */ var _themeSelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./themeSelector.js */ \"./src/js/themeSelector.js\");\n/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operations.js */ \"./src/js/operations.js\");\n\r\n\r\n\r\n\r\n\r\nclass Calculator {\r\n  constructor(selector) {\r\n    this.selector = selector;\r\n    this.display = new _display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.keyBoard = new _Buttons_keyBoad_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ callBack: (text) => this.#click(text) });\r\n    this.operations = new _operations_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]((value) => this.#changeResult(value));\r\n    this.themeSelector = new _themeSelector_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](() => Calculator.#changeTheme());\r\n  }\r\n\r\n  #click(text) {\r\n    this.operations.showCalculations(text);\r\n  }\r\n\r\n  #changeResult(value) {\r\n    this.display.showResult(value);\r\n  }\r\n\r\n  static #changeTheme() {\r\n    const bodyCalc = document.getElementById('calc').classList;\r\n    bodyCalc.toggle('calc_theme_dark');\r\n  }\r\n\r\n  get templateMarckup() {\r\n    return (\r\n      `<div class=\"calc calc_${this.selector}\" id=\"calc\">\r\n      <div class=\"theme\">\r\n        <div class=\"theme__container\">\r\n          <label for=\"checkbox\" class=\"theme__selector\" id=\"toggleSelector\">\r\n            <i class=\"icon-sun\"></i>\r\n            <i class=\"icon-moon-1\"></i>\r\n            <div class=\"theme__ball\" id=\"toggleBall\"></div>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    <div class=\"calc__container\" id=\"calcContainer\">\r\n      <div class=\"calc-screen\" id=\"screen\">\r\n      <div class =\"calc-screen__calculations-container\" id=\"calculationContainer\">\r\n      </div>\r\n      </div>\r\n      <div class=\"calc-buttons\" id=\"calcButtons\">\r\n        </div>\r\n      </div>\r\n    </div>`);\r\n  }\r\n\r\n  init() {\r\n    document.body.innerHTML += this.templateMarckup;\r\n\r\n    document.getElementById('toggleSelector').before(this.themeSelector.render());\r\n    this.operations.render().map((element) => document.getElementById('calculationContainer').append(element));\r\n    document.getElementById('screen').append(this.display.render());\r\n\r\n    this.keyBoard.render().forEach((btn) => {\r\n      document.getElementById('calcButtons').append(btn);\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/js/Calculator.js?");

/***/ }),

/***/ "./src/js/callFunction.js":
/*!********************************!*\
  !*** ./src/js/callFunction.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ callFunction)\n/* harmony export */ });\nfunction callFunction(callBack, from, ...args) {\r\n  if (typeof callBack === 'function') {\r\n    return callBack.bind(from, ...args);\r\n  }\r\n  console.log(`${callBack} is not a function`);\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/js/callFunction.js?");

/***/ }),

/***/ "./src/js/display.js":
/*!***************************!*\
  !*** ./src/js/display.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Display {\r\n  constructor() {\r\n    this.state = 0;\r\n  }\r\n\r\n  static createEl() {\r\n    const resultText = document.createElement('p');\r\n\r\n    resultText.className = 'calc-screen__result';\r\n    resultText.id = 'resultText';\r\n    resultText.textContent = 0;\r\n\r\n    return resultText;\r\n  }\r\n\r\n  showResult(value) {\r\n    const resultScreenText = document.getElementById('resultText');\r\n\r\n    this.state = value;\r\n    resultScreenText.textContent = this.state;\r\n  }\r\n\r\n  render() {\r\n    return Display.createEl();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/display.js?");

/***/ }),

/***/ "./src/js/get.js":
/*!***********************!*\
  !*** ./src/js/get.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ get)\n/* harmony export */ });\nfunction get(props, requiredField, defaultValue) {\r\n  const getTypeProps = typeof props;\r\n\r\n  const processData = Array.isArray(requiredField) ? requiredField : requiredField.split('.');\r\n\r\n  let value = '';\r\n\r\n  function iterating(obj) {\r\n    const objectKeys = Object.keys(obj);\r\n\r\n    objectKeys.forEach((key) => {\r\n      processData.forEach((data, i) => {\r\n        if (key.includes(data)) {\r\n          if (Array.isArray(obj[key])) {\r\n            iterating(obj[key][processData[i + 1]]);\r\n          }\r\n\r\n          if (typeof obj[key] === 'object') {\r\n            iterating(obj[key]);\r\n          } else {\r\n            value = (obj[key]);\r\n          }\r\n        }\r\n      });\r\n    });\r\n  }\r\n\r\n  if (getTypeProps === 'object') {\r\n    iterating(props);\r\n  }\r\n  if (getTypeProps === 'string' || getTypeProps === 'number' || getTypeProps === 'function') {\r\n    value = props;\r\n  }\r\n\r\n  if (!value) return defaultValue;\r\n  return value;\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/js/get.js?");

/***/ }),

/***/ "./src/js/operations.js":
/*!******************************!*\
  !*** ./src/js/operations.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Operations)\n/* harmony export */ });\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables.js */ \"./src/js/variables.js\");\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display.js */ \"./src/js/display.js\");\n\r\n\r\n\r\n/**\r\n * @module Operations\r\n * @see module: Script\r\n * @class\r\n * @extends Display\r\n */\r\nclass Operations extends _display_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n  /**\r\n   * @param {function} callback Accepts a callback to process\r\n   */\r\n  constructor(callback) {\r\n    super();\r\n    this.showResult = callback;\r\n    this.result = 0;\r\n    this.prevNumber = 0;\r\n    this.currentNumber = 0;\r\n  }\r\n\r\n  /**\r\n   * @returns html object\r\n   */\r\n  createEl() {\r\n    const calculationText = document.createElement('p');\r\n    const leftBtn = document.createElement('button');\r\n    const rightBtn = document.createElement('button');\r\n\r\n    leftBtn.onclick = () => {\r\n      calculationText.scrollLeft -= 100;\r\n    };\r\n\r\n    rightBtn.onclick = () => {\r\n      calculationText.scrollLeft += 100;\r\n    };\r\n\r\n    leftBtn.className = 'calc-screen__btn-left';\r\n    leftBtn.id = 'leftBtn';\r\n    leftBtn.textContent = '<';\r\n    rightBtn.className = 'calc-screen__btn-right';\r\n    rightBtn.id = 'rightBtn';\r\n    rightBtn.textContent = '>';\r\n\r\n    calculationText.className = 'calc-screen__calculations';\r\n    calculationText.id = 'calcText';\r\n    calculationText.textContent = this.state;\r\n\r\n    return [leftBtn, calculationText, rightBtn];\r\n  }\r\n\r\n  /**\r\n   * A method that calculates the font size using a dependency\r\n   * @param {number} num - Accepts a number from which to calculate the size\r\n   * @param {boolean} isCalculations For result or calculation\r\n   * @returns font-size\r\n   * @static\r\n   * @private\r\n   */\r\n  static #setFontSize(num, isCalculations) {\r\n    const calculationScreenResult = document.getElementById('resultText');\r\n    const calculationScreenText = document.getElementById('calcText');\r\n\r\n    const leftBtn = document.getElementById('leftBtn');\r\n    const rightBtn = document.getElementById('rightBtn');\r\n\r\n    let size = (21.6122 - num) / 0.2208;\r\n    // if (isCalculations && num < 15) {\r\n    //   return;\r\n    // }\r\n\r\n    if (!isCalculations) {\r\n      if (num >= 9) {\r\n        size = (25.5352 - num) / 0.3134;\r\n      }\r\n\r\n      if (num >= 15) {\r\n        size = (32.5000 - num) / 0.5000;\r\n      }\r\n\r\n      if (num >= 17) {\r\n        size = (43.2143 - num) / 0.8571;\r\n      }\r\n      if (num >= 19) {\r\n        size = (5 - num) / 1;\r\n      }\r\n\r\n      calculationScreenResult.style.fontSize = `${size}px`;\r\n      return;\r\n    }\r\n\r\n    if (num >= 12) {\r\n      leftBtn.style.visibility = 'visible';\r\n      rightBtn.style.visibility = 'visible';\r\n\r\n      return;\r\n    }\r\n    leftBtn.style.visibility = 'hidden';\r\n    rightBtn.style.visibility = 'hidden';\r\n  }\r\n\r\n  /**\r\n   * Error handler\r\n   * @private\r\n  */\r\n  #errorHandler() {\r\n    if (Number.isNaN(this.currentNumber)) {\r\n      this.currentNumber = 0;\r\n    }\r\n\r\n    if (Number.isNaN(this.result)) {\r\n      this.result = 'Ошибка';\r\n    }\r\n\r\n    if (Number.isNaN(this.prevNumber)) {\r\n      this.prevNumber = 0;\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Method that displays calculations and their result\r\n   * @param {string/number} value Accepts a string or number\r\n   */\r\n  showCalculations(value) {\r\n    const calculationScreenText = document.getElementById('calcText');\r\n    const calculationScreenResult = document.getElementById('resultText');\r\n    const currentNumberLength = this.currentNumber.length;\r\n\r\n    let element = value;\r\n\r\n    switch (element) {\r\n      case 'reset':\r\n        element = 'c';\r\n        break;\r\n      case 'multiplication':\r\n        element = '×';\r\n        break;\r\n      case 'equal':\r\n        element = '=';\r\n        break;\r\n      case 'division':\r\n        element = '÷';\r\n        break;\r\n      case 'minus':\r\n        element = '-';\r\n        break;\r\n      case 'plus':\r\n        element = '+';\r\n        break;\r\n      case 'percent':\r\n        element = '%';\r\n        break;\r\n      case 'plus-minus':\r\n        element = '/';\r\n        break;\r\n      case 'dot':\r\n        element = '.';\r\n        break;\r\n      default:\r\n        element = value;\r\n    }\r\n\r\n    if (currentNumberLength >= 5) {\r\n      Operations.#setFontSize(currentNumberLength, false);\r\n    }\r\n\r\n    // Button for removing elements in a row\r\n    if (element === 'delete') {\r\n      const clone = this.currentNumber;\r\n\r\n      if (this.currentNumber === 0 && this.result > 0) {\r\n        calculationScreenText.textContent = this.currentNumber;\r\n\r\n        return;\r\n      }\r\n\r\n      if (Number(this.currentNumber) === 0 || this.currentNumber.length < 2) {\r\n        this.currentNumber = 0;\r\n        this.showResult(this.currentNumber);\r\n\r\n        return;\r\n      }\r\n\r\n      this.currentNumber = this.currentNumber.toString().slice(0, this.currentNumber.length - 1);\r\n\r\n      if (this.currentNumber !== clone) {\r\n        this.showResult(this.currentNumber);\r\n      }\r\n\r\n      return;\r\n    }\r\n\r\n    // Can't put equal until there's a number\r\n    if ((this.currentNumber === 0 && this.prevNumber === 0) && element === '=') {\r\n      return;\r\n    }\r\n\r\n    /* If the current number = 0 and the \"dot\" button is not pressed,\r\n     the current number is equal to \" \" */\r\n    if (this.currentNumber === 0 && element !== '.') {\r\n      this.currentNumber = '';\r\n    }\r\n\r\n    // Button +/-\r\n    if (element === '/') {\r\n      if (Number(this.currentNumber) === 0) {\r\n        return;\r\n      }\r\n\r\n      const opposite = -Number(this.currentNumber.toString().slice(0, this.currentNumber.length));\r\n      this.currentNumber = opposite;\r\n      this.#errorHandler();\r\n      this.showResult(this.currentNumber);\r\n\r\n      return;\r\n    }\r\n\r\n    // It is forbidden to repeat operations\r\n    if ((this.currentNumber.toString().includes('.') && element === '.')\r\n      || (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element) && this.currentNumber.toString().includes(element !== '-'))\r\n      || (element === '=' && this.currentNumber.toString().includes('='))) {\r\n      return;\r\n    }\r\n\r\n    // It is forbidden to press buttons if there is an error on the screen\r\n    if ((this.currentNumber === 'Ошибка' || this.result === 'Ошибка') && element !== 'c') {\r\n      return;\r\n    }\r\n\r\n    // Maximum string length 16 characters\r\n    if (this.currentNumber.length <= 16\r\n      || _variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element)\r\n      || element === '/'\r\n      || element === '=') {\r\n      this.currentNumber += element;\r\n    }\r\n\r\n    // If pressed equals immediately after the current number translate into Calculations\r\n    if (element === '=' && this.prevNumber === 0) {\r\n      calculationScreenText.textContent = this.currentNumber;\r\n      this.prevNumber = this.currentNumber;\r\n      this.currentNumber = 0;\r\n\r\n      return;\r\n    }\r\n\r\n    // If any operation is pressed, then assign the current number to the previous one and display\r\n    if (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element)) {\r\n      // If there is a previous number, then connect it to the current one.\r\n      if ((this.prevNumber.length > 1 && Number(this.prevNumber)) || this.prevNumber.toString().includes('=')) {\r\n        this.prevNumber = this.prevNumber.slice(0, this.prevNumber.length - 1);\r\n        this.prevNumber += this.currentNumber;\r\n        this.#errorHandler();\r\n\r\n        calculationScreenText.textContent = this.prevNumber;\r\n        this.currentNumber = 0;\r\n\r\n        return;\r\n      }\r\n\r\n      if (this.prevNumber.toString().includes('=')) {\r\n        this.prevNumber = this.prevNumber.toString(0, this.prevNumber.length - 1);\r\n      }\r\n\r\n      this.prevNumber = this.currentNumber;\r\n      this.currentNumber = 0;\r\n      Operations.#setFontSize(this.prevNumber.length, true);\r\n      console.log(123);\r\n      calculationScreenText.textContent = this.prevNumber;\r\n    }\r\n\r\n    // If the operator is pressed and there is a previous result, then connect them\r\n    if (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element) && Number(this.result !== 0)) {\r\n      this.#errorHandler();\r\n      calculationScreenText.textContent = this.result + element;\r\n    }\r\n\r\n    if (element === '=' || element === '%') {\r\n      this.calculating(element);\r\n    }\r\n\r\n    // If the current number is 0 and 'dot' button is pressed, then sum\r\n    if (element === '.' && this.currentNumber === 0) {\r\n      this.currentNumber += '.';\r\n    }\r\n\r\n    // Button 'C'\r\n    if (element === 'c') {\r\n      this.currentNumber = 0;\r\n      this.prevNumber = 0;\r\n      this.result = 0;\r\n      this.showResult(0);\r\n      Operations.#setFontSize(this.currentNumber, true);\r\n      calculationScreenText.textContent = this.currentNumber;\r\n\r\n      calculationScreenText.style.fontSize = '40px';\r\n      calculationScreenResult.style.fontSize = '96px';\r\n    }\r\n\r\n    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {\r\n      this.#errorHandler();\r\n      this.showResult(this.currentNumber);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Operation Calculation Method\r\n   * @param {string} value  accepts % or =\r\n   * @returns result depending on the operation\r\n   */\r\n  calculating(value) {\r\n    const calculationScreenText = document.getElementById('calcText');\r\n    const calculationScreenResult = document.getElementById('resultText');\r\n    const calcStory = (this.prevNumber.toString() + this.currentNumber.toString());\r\n    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')\r\n      ? calcStory.length - 1\r\n      : calcStory.length)\r\n      .split('');\r\n\r\n    if (value === '=') {\r\n      let isOperation = false;\r\n\r\n      storyArr.some((element, i) => {\r\n        if (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element) && i === 0\r\n          && !this.result\r\n          && this.prevNumber.toString().length > 1) {\r\n          return;\r\n        }\r\n\r\n        if ((_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element) && !isOperation) || element === '=') {\r\n          let prevNumber = this.result ? this.result : Number(storyArr.slice(0, i).join(''));\r\n          let nextNumber = storyArr.slice(i + 1).length === 0 ? prevNumber : Number(storyArr.slice(i + 1).join(''));\r\n\r\n          isOperation = true;\r\n\r\n          if (nextNumber === 0 && element !== '÷') {\r\n            nextNumber = prevNumber;\r\n          }\r\n\r\n          nextNumber = Number.isNaN(nextNumber) ? 0 : nextNumber;\r\n          prevNumber = Number.isNaN(prevNumber) ? 0 : prevNumber;\r\n\r\n          if (this.result.length === 1) {\r\n            calculationScreenResult.style.fontSize = `${60}px`;\r\n            calculationScreenResult.style.marginTop = `${41}px`;\r\n          }\r\n\r\n          switch (element) {\r\n            case '+':\r\n              this.result = prevNumber + nextNumber;\r\n              break;\r\n            case '-':\r\n              this.result = prevNumber - nextNumber;\r\n              break;\r\n            case '÷':\r\n              if (nextNumber === 0) {\r\n                this.result = 'Деление на 0 невозможно';\r\n                this.showResult(this.result);\r\n                break;\r\n              }\r\n              this.result = Math.floor((prevNumber / nextNumber) * 10 ** 16) / 10 ** 16;\r\n              break;\r\n            case '×':\r\n              this.result = prevNumber * nextNumber;\r\n              break;\r\n            default:\r\n              this.showResult(0);\r\n          }\r\n\r\n          this.#errorHandler();\r\n\r\n          if (this.result.toString().length > 9 && typeof this.result === 'number') {\r\n            this.result = this.result.toExponential(16);\r\n          }\r\n\r\n          this.showResult(this.result);\r\n          calculationScreenText.textContent = `${prevNumber}${element}${nextNumber}=`;\r\n          this.currentNumber = 0;\r\n          this.prevNumber = 0;\r\n\r\n          if (calculationScreenResult.textContent.length > 16) {\r\n            calculationScreenResult.style.fontSize = '25px';\r\n          }\r\n        }\r\n      });\r\n\r\n      if (this.result.toString().length >= 5) {\r\n        const resultLength = this.result.toString().length;\r\n        Operations.#setFontSize(resultLength, false);\r\n      }\r\n\r\n      if (calculationScreenText.textContent.length >= 5) {\r\n        Operations.#setFontSize(calculationScreenText.textContent.length, true);\r\n      }\r\n\r\n      return;\r\n    }\r\n\r\n    if (value === '%') {\r\n      const convertNum = this.result\r\n        ? this.result\r\n        : this.prevNumber.toString().slice(0, this.prevNumber.toString().length - 1);\r\n\r\n      if (Number(convertNum)) {\r\n        storyArr.forEach((element, i) => {\r\n          if (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element) && i === 0 && !this.result) {\r\n            return;\r\n          }\r\n\r\n          if (_variables_js__WEBPACK_IMPORTED_MODULE_0__.OPERATORS.includes(element)) {\r\n            const prevNumber = this.result ? this.result : Number(storyArr.slice(0, i).join(''));\r\n            const nextNumber = Number(storyArr.slice(i + 1).join(''));\r\n\r\n            const operations = {\r\n              percent: ['×', '÷'],\r\n              fraction: ['+', '-'],\r\n            };\r\n\r\n            const percentNumber = operations.percent.includes(element)\r\n              ? nextNumber / 100\r\n              : (prevNumber * nextNumber) / 100;\r\n\r\n            switch (element) {\r\n              case '+':\r\n                this.result = prevNumber + percentNumber;\r\n                break;\r\n              case '×':\r\n                this.result = prevNumber * percentNumber;\r\n                break;\r\n              case '÷':\r\n                this.result = prevNumber / percentNumber;\r\n                break;\r\n              case '-':\r\n                this.result = prevNumber - percentNumber;\r\n                break;\r\n              default:\r\n            }\r\n            if (this.result.toString().length >= 5) {\r\n              const resultLength = this.result.toString().length;\r\n              Operations.#setFontSize(resultLength, false);\r\n            }\r\n            this.#errorHandler();\r\n            this.showResult(this.result);\r\n            this.currentNumber = 0;\r\n            this.prevNumber = 0;\r\n            calculationScreenText.textContent = `${prevNumber}${element}${percentNumber}`;\r\n          }\r\n        });\r\n        return;\r\n      }\r\n\r\n      this.currentNumber = 0;\r\n      this.showResult(0);\r\n      return;\r\n    }\r\n\r\n    if (this.prevNumber.toString().includes('=')) {\r\n      this.prevNumber = 0;\r\n    }\r\n  }\r\n\r\n  render() {\r\n    return this.createEl();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://calculator/./src/js/operations.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Calculator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calculator.js */ \"./src/js/Calculator.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  (new _Calculator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('test')).init();\r\n});\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/js/script.js?");

/***/ }),

/***/ "./src/js/themeSelector.js":
/*!*********************************!*\
  !*** ./src/js/themeSelector.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ThemeSelector {\r\n  constructor(onChangeCallBack) {\r\n    this.onChange = onChangeCallBack;\r\n  }\r\n\r\n  createEl() {\r\n    const checkbox = document.createElement('input');\r\n\r\n    checkbox.className = 'checkbox';\r\n    checkbox.id = 'checkbox';\r\n    checkbox.type = 'checkbox';\r\n\r\n    checkbox.addEventListener('change', () => this.onChange());\r\n\r\n    return checkbox;\r\n  }\r\n\r\n  render() {\r\n    return this.createEl();\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeSelector);\r\n\n\n//# sourceURL=webpack://calculator/./src/js/themeSelector.js?");

/***/ }),

/***/ "./src/js/variables.js":
/*!*****************************!*\
  !*** ./src/js/variables.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TimePeriods\": () => (/* binding */ TimePeriods),\n/* harmony export */   \"ConvertTimeinMinutes\": () => (/* binding */ ConvertTimeinMinutes),\n/* harmony export */   \"NIGHT\": () => (/* binding */ NIGHT),\n/* harmony export */   \"DAY\": () => (/* binding */ DAY),\n/* harmony export */   \"MINUTE_IN_MS\": () => (/* binding */ MINUTE_IN_MS),\n/* harmony export */   \"MOCK_BTN\": () => (/* binding */ MOCK_BTN),\n/* harmony export */   \"OPERATORS\": () => (/* binding */ OPERATORS)\n/* harmony export */ });\nconst TimePeriods = { MORNING: 6, NIGHT: 18 };\r\nconst ConvertTimeinMinutes = {\r\n  HOUR: 60,\r\n  MORNING: 360,\r\n  NIGHT: 1080,\r\n  FULL_DAY: 1440,\r\n};\r\nconst NIGHT = 'night';\r\nconst DAY = 'day';\r\nconst MINUTE_IN_MS = 60000;\r\n\r\nconst OPERATORS = ['×', '÷', '-', '+'];\r\n\r\nconst MOCK_BTN = [\r\n  {\r\n    name: 'btn_ac',\r\n    color: 'btn_bg_gray',\r\n    text: 'c',\r\n    value: 'reset',\r\n  },\r\n  {\r\n    name: 'btn_plus-minus',\r\n    color: 'btn_bg_gray',\r\n    text: '<span class=\"btn__plus-minus\">/</span>',\r\n    value: 'plus-minus',\r\n  },\r\n  {\r\n    name: 'btn_percent',\r\n    color: 'btn_bg_gray',\r\n    text: '%',\r\n    value: 'percent',\r\n  },\r\n  {\r\n    name: 'btn_division',\r\n    color: 'btn_bg_blue',\r\n    text: '÷',\r\n    value: 'division',\r\n  },\r\n  {\r\n    name: 'btn_seven',\r\n    color: ' ',\r\n    text: '7',\r\n    value: 7,\r\n  },\r\n  {\r\n    name: 'btn_eigth',\r\n    color: ' ',\r\n    text: '8',\r\n    value: 8,\r\n  },\r\n  {\r\n    name: 'btn_nine',\r\n    color: ' ',\r\n    text: '9',\r\n    value: 9,\r\n  },\r\n  {\r\n    name: 'btn_multiplication',\r\n    color: 'btn_bg_blue',\r\n    text: '×',\r\n    value: 'multiplication',\r\n  },\r\n  {\r\n    name: 'btn_four',\r\n    color: ' ',\r\n    text: '4',\r\n    value: 4,\r\n  },\r\n  {\r\n    name: 'btn_five',\r\n    color: ' ',\r\n    text: '5',\r\n    value: 5,\r\n  },\r\n  {\r\n    name: 'btn_six',\r\n    color: ' ',\r\n    text: '6',\r\n    value: 6,\r\n  },\r\n  {\r\n    name: 'btn_minus',\r\n    color: 'btn_bg_blue',\r\n    text: '-',\r\n    value: 'minus',\r\n  },\r\n  {\r\n    name: 'btn_one',\r\n    color: ' ',\r\n    text: '1',\r\n    value: 1,\r\n  },\r\n  {\r\n    name: 'btn_two',\r\n    color: ' ',\r\n    text: '2',\r\n    value: 2,\r\n  },\r\n  {\r\n    name: 'btn_three',\r\n    color: ' ',\r\n    text: '3',\r\n    value: 3,\r\n  },\r\n  {\r\n    name: 'btn_plus',\r\n    color: 'btn_bg_blue',\r\n    text: '+',\r\n    value: 'plus',\r\n  },\r\n  {\r\n    name: 'btn_dot',\r\n    color: ' ',\r\n    text: '.',\r\n    value: 'dot',\r\n  },\r\n  {\r\n    name: 'btn_btn_zero',\r\n    color: ' ',\r\n    text: '0',\r\n    value: 0,\r\n  },\r\n  {\r\n    name: 'btn_delete',\r\n    color: ' ',\r\n    text: '<div class=\"btn__delete\" id=\"btnDelete\"><span>+</span></div>',\r\n    value: 'delete',\r\n  },\r\n  {\r\n    name: 'btn_equal',\r\n    color: 'btn_bg_blue',\r\n    text: '=',\r\n    value: 'equal',\r\n  },\r\n];\r\n\r\n\r\n\n\n//# sourceURL=webpack://calculator/./src/js/variables.js?");

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