import { OPERATORS } from './variables.js';
import Display from './display.js';
import splittingNumber from './splittingNumber.js';

/**
 * @module Operations
 * @see module: Script
 * @class
 * @extends Display
 */
export default class Operations extends Display {
  /**
   * @param {function} callback Accepts a callback to process
   */
  constructor(callback) {
    super();
    this.showResult = callback;
    this.result = 0;
    this.prevNumber = 0;
    this.currentNumber = 0;
    this.operation = '';
  }

  /**
   * @returns html object
   */
  createEl() {
    const calculationText = document.createElement('p');
    const leftBtn = document.createElement('button');
    const rightBtn = document.createElement('button');

    leftBtn.onclick = () => {
      calculationText.scrollLeft -= 100;
    };

    rightBtn.onclick = () => {
      calculationText.scrollLeft += 100;
    };

    leftBtn.className = 'calc-screen__btn-left';
    leftBtn.id = 'leftBtn';
    leftBtn.textContent = '<';
    rightBtn.className = 'calc-screen__btn-right';
    rightBtn.id = 'rightBtn';
    rightBtn.textContent = '>';

    calculationText.className = 'calc-screen__calculations';
    calculationText.id = 'calcText';
    calculationText.textContent = this.state;

    return [leftBtn, calculationText, rightBtn];
  }

  /**
   * A method that calculates the font size using a dependency
   * @param {number} num - Accepts a number from which to calculate the size
   * @param {boolean} isCalculations For result or calculation
   * @returns font-size
   * @static
   * @private
   */
  static #setFontSize(num, isCalculations) {
    const calculationScreenResult = document.getElementById('resultText');
    const calculationScreenText = document.getElementById('calcText');

    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    let size = (22.6122 - num) / 0.2388;
    // if (isCalculations && num < 15) {
    //   return;
    // }
    debugger
    if (!isCalculations) {
      if (num >= 9) {
        size = (22.4433 - num) / 0.2497;
      }

      if (num >= 15) {
        size = (32.5000 - num) / 0.5000;
      }

      if (num >= 17) {
        size = (43.2143 - num) / 0.8571;
      }
      if (num >= 19) {
        size = 27;
      }

      calculationScreenResult.style.fontSize = `${size}px`;
      return;
    }

    if (num > 21) {
      leftBtn.style.visibility = 'visible';
      rightBtn.style.visibility = 'visible';

      return;
    }
    leftBtn.style.visibility = 'hidden';
    rightBtn.style.visibility = 'hidden';
  }

  /**
   * Error handler
   * @private
  */
  #errorHandler() {
    if (Number.isNaN(this.currentNumber)) {
      this.currentNumber = 0;
    }

    if (Number.isNaN(this.result)) {
      this.result = 'Ошибка';
    }

    if (Number.isNaN(this.prevNumber)) {
      this.prevNumber = 0;
    }
  }

  /**
   * Method that displays calculations and their result
   * @param {string/number} value Accepts a string or number
   */
  showCalculations(value) {
    const calculationScreenText = document.getElementById('calcText');
    const calculationScreenResult = document.getElementById('resultText');
    const currentNumberLength = splittingNumber(this.currentNumber).length;

    let element = value;

    switch (element) {
      case 'reset':
        element = 'c';
        break;
      case 'multiplication':
        element = '×';
        break;
      case 'equal':
        element = '=';
        break;
      case 'division':
        element = '÷';
        break;
      case 'minus':
        element = '-';
        break;
      case 'plus':
        element = '+';
        break;
      case 'percent':
        element = '%';
        break;
      case 'plus-minus':
        element = '/';
        break;
      case 'dot':
        element = '.';
        break;
      default:
        element = value;
    }

    // If the length of the current number >= 5, then use the setFontSize()
    if (currentNumberLength >= 5) {
      Operations.#setFontSize(currentNumberLength, false);
    }

    // Button for removing elements in a row
    if (element === 'delete') {
      const clone = this.currentNumber;

      Operations.#setFontSize(splittingNumber(currentNumberLength), false);

      if (this.currentNumber === 0 && this.result > 0) {
        calculationScreenText.textContent = this.currentNumber;

        return;
      }

      if (Number(this.currentNumber) === 0 || this.currentNumber.length < 2) {
        this.currentNumber = 0;
        this.showResult(this.currentNumber);

        return;
      }

      this.currentNumber = this.currentNumber.toString().slice(0, this.currentNumber.length - 1);

      if (this.currentNumber !== clone) {
        this.showResult(this.currentNumber);
      }

      return;
    }

    // Can't put equal until there's a number
    if ((this.currentNumber === 0 && this.prevNumber === 0 && this.result === 0) && element === '=') {
      return;
    }

    /* If the current number = 0 and the "dot" button is not pressed,
     the current number is equal to " " */
    if (this.currentNumber === 0 && element !== '.') {
      this.currentNumber = '';
    }

    // Button +/-
    if (element === '/') {
      if (Number(this.currentNumber) === 0) {
        return;
      }
      // debugger;
      const opposite = -Number(this.currentNumber.toString().slice(0, this.currentNumber.length));
      this.currentNumber = opposite;
      this.#errorHandler();
      this.showResult(this.currentNumber);

      return;
    }

    // It is forbidden to repeat operations
    if ((this.currentNumber.toString().includes('.') && element === '.')
      || (OPERATORS.includes(element) && this.currentNumber.toString().includes(element !== '-'))
      || (element === '=' && this.currentNumber.toString().includes('='))) {
      return;
    }

    // It is forbidden to press buttons if there is an error on the screen
    if ((this.currentNumber === 'Ошибка' || this.result === 'Ошибка') && element !== 'c') {
      return;
    }

    // If the current result exists and = is pressed, then add the result to the previous value
    if (element === '=' && this.result && this.currentNumber === '') {
      this.calculating(element);
      return;
    }

    // Maximum string length 16 characters
    if (this.currentNumber.length <= 16
      || OPERATORS.includes(element)
      || element === '/'
      || element === '=') {
      this.currentNumber += element;
    }

    // If pressed equals immediately after the current number translate into Calculations
    if (element === '=' && this.prevNumber === 0) {
      calculationScreenText.textContent = this.currentNumber;
      this.prevNumber = this.currentNumber;
      this.currentNumber = 0;

      return;
    }

    // If any operation is pressed, then assign the current number to the previous one and display
    if (OPERATORS.includes(element)) {
      // If there is a previous number, then connect it to the current one.
      if ((this.prevNumber.length > 1 && this.prevNumber) || this.prevNumber.toString().includes('=')) {
        this.prevNumber = this.prevNumber.slice(0, this.prevNumber.length - 1);
        this.prevNumber += this.currentNumber;
        this.#errorHandler();

        calculationScreenText.textContent = this.prevNumber;
        this.currentNumber = 0;

        return;
      }

      if (this.prevNumber.toString().includes('=')) {
        this.prevNumber = this.prevNumber.toString(0, this.prevNumber.length - 1);
      }

      this.prevNumber = this.currentNumber;
      this.currentNumber = 0;
      Operations.#setFontSize(splittingNumber(this.prevNumber).length, true);
      calculationScreenText.textContent = this.prevNumber;
    }

    // If the operator is pressed and there is a previous result, then connect them
    if (OPERATORS.includes(element) && Number(this.result !== 0)) {
      this.#errorHandler();
      calculationScreenText.textContent = this.result + element;
    }

    if (element === '=' || element === '%') {
      this.calculating(element);
    }

    // If the current number is 0 and 'dot' button is pressed, then sum
    if (element === '.' && this.currentNumber === 0) {
      this.currentNumber += '.';
    }

    // Button 'C'
    if (element === 'c') {
      this.currentNumber = 0;
      this.prevNumber = 0;
      this.result = 0;
      this.showResult(0);
      Operations.#setFontSize(this.currentNumber, true);
      calculationScreenText.textContent = this.currentNumber;

      calculationScreenText.style.fontSize = '40px';
      calculationScreenResult.style.fontSize = '96px';
    }

    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {
      this.#errorHandler();
      this.showResult(this.currentNumber);
    }
  }

  /**
   * Operation Calculation Method
   * @param {string} value  accepts % or =
   * @returns result depending on the operation
   */
  calculating(value) {
    const calculationScreenText = document.getElementById('calcText');
    const calculationScreenResult = document.getElementById('resultText');
    const calcStory = (this.prevNumber.toString() + this.currentNumber.toString());
    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')
      ? calcStory.length - 1
      : calcStory.length)
      .split('');

    if (value === '=') {
      let isOperation = false;

      storyArr.some((element, i) => {
        if (OPERATORS.includes(element) && i === 0
          && !this.result
          && this.prevNumber.toString().length > 1) {
          return;
        }

        if ((OPERATORS.includes(element) && !isOperation) || element === '=') {
          let prevNumber = this.result ? this.result : Number(storyArr.slice(0, i).join(''));
          let nextNumber = storyArr.slice(i + 1).length === 0 ? prevNumber : Number(storyArr.slice(i + 1).join(''));

          isOperation = true;

          if (nextNumber === 0 && element !== '÷') {
            nextNumber = prevNumber;
          }

          nextNumber = Number.isNaN(nextNumber) ? 0 : nextNumber;
          prevNumber = Number.isNaN(prevNumber) ? 0 : prevNumber;

          if (this.result.length === 1) {
            calculationScreenResult.style.fontSize = `${60}px`;
            calculationScreenResult.style.marginTop = `${41}px`;
          }

          switch (element) {
            case '+':
              this.result = prevNumber + nextNumber;
              break;
            case '-':
              this.result = prevNumber - nextNumber;
              break;
            case '÷':
              if (nextNumber === 0) {
                this.result = 'Деление на 0 невозможно';
                this.showResult(this.result);
                break;
              }
              this.result = Math.floor((prevNumber / nextNumber) * 10 ** 16) / 10 ** 16;
              break;
            case '×':
              this.result = prevNumber * nextNumber;
              break;
            default:
              this.showResult(0);
          }

          this.#errorHandler();
          debugger;
          if (this.result > 10 ** 10) {
            this.result = this.result.toExponential(15);
          }

          this.showResult(this.result);
          calculationScreenText.textContent = `${prevNumber}${element}${nextNumber}=`;
          this.currentNumber = 0;
          this.prevNumber = nextNumber;
          this.operation = element;
        }
      });

      if (this.result.toString().length >= 5) {
        const resultLength = splittingNumber(this.result).length;
        Operations.#setFontSize(resultLength, false);
      }

      if (calculationScreenText.textContent.length >= 5) {
        Operations.#setFontSize(calculationScreenText.textContent.length, true);
      }

      if (this.result && this.currentNumber === '') {
        calculationScreenText.textContent = `${this.result}${this.operation}${this.prevNumber}=`;

        switch (this.operation) {
          case '+':
            this.result += this.prevNumber;
            break;
          case '-':
            this.result -= this.prevNumber;
            break;
          case '÷':
            this.result /= this.prevNumber;
            break;
          case '×':
            this.result *= this.prevNumber;
            break;
          default:
            this.result = this.result;
        }

        if (this.result > 10 ** 10) {
          this.result = this.result.toExponential(15);
        }

        this.showResult(this.result);
      }

      if (calculationScreenResult.textContent.length > 16) {
        calculationScreenResult.style.fontSize = '25px';
      }

      return;
    }

    if (value === '%') {
      const convertNum = this.result
        ? this.result
        : this.prevNumber.toString().slice(0, this.prevNumber.toString().length - 1);

      if (Number(convertNum)) {
        storyArr.forEach((element, i) => {
          if (OPERATORS.includes(element) && i === 0 && !this.result) {
            return;
          }

          if (OPERATORS.includes(element)) {
            const prevNumber = this.result ? this.result : Number(storyArr.slice(0, i).join(''));
            const nextNumber = Number(storyArr.slice(i + 1).join(''));

            const operations = {
              percent: ['×', '÷'],
              fraction: ['+', '-'],
            };

            const percentNumber = operations.percent.includes(element)
              ? nextNumber / 100
              : (prevNumber * nextNumber) / 100;

            switch (element) {
              case '+':
                this.result = prevNumber + percentNumber;
                break;
              case '×':
                this.result = prevNumber * percentNumber;
                break;
              case '÷':
                this.result = prevNumber / percentNumber;
                break;
              case '-':
                this.result = prevNumber - percentNumber;
                break;
              default:
            }
            if (this.result.toString().length >= 5) {
              const resultLength = splittingNumber(this.result).length;
              Operations.#setFontSize(resultLength, false);
            }
            this.#errorHandler();
            this.showResult(this.result);
            this.currentNumber = 0;
            this.prevNumber = 0;
            calculationScreenText.textContent = `${prevNumber}${element}${percentNumber}=`;
          }
        });
        return;
      }

      this.currentNumber = 0;
      this.showResult(0);
      return;
    }

    if (this.prevNumber.toString().includes('=')) {
      this.prevNumber = 0;
    }
  }

  render() {
    return this.createEl();
  }
}
