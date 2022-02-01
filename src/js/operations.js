import { OPERATORS } from "./variables.js";
import Display from './display.js';

export default class Operations extends Display {
  constructor(callback) {
    super();
    this.showResult = callback;
    this.result = 0;
    this.prevNumber = 0;
    this.currentNumber = 0;
  }

  createEl() {
    const calculationText = document.createElement('p');

    calculationText.className = 'calc-screen__calculations';
    calculationText.id = 'calcText';
    calculationText.textContent = this.state;

    return calculationText;
  }

  #setFontSize(num, calculations) {
    const calculationScreenResult = document.getElementById('resultText');
    const calculationScreenText = document.getElementById('calcText');
    let size = (21.6122 - num) / 0.2208;

    if (num >= 9) {
      size = (25.5352 - num) / 0.3134;
    }

    if (num >= 15) {
      size = (32.5000 - num) / 0.5000;
    }

    if (num >= 17) {
      size = (43.2143 - num) / 0.8571;
    }

    if (calculations) {
      if (num >= 22) {
        size = (49.6691 - num) / 1.0736;
      }
    }
    if (!calculations) {
      calculationScreenResult.style.fontSize = `${size}px`;

      return;
    }
    calculationScreenText.style.fontSize = `${size}px`;
  }

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

  showCalculations(value) {
    const calculationScreenText = document.getElementById('calcText');
    const calculationScreenResult = document.getElementById('resultText');
    const currentNumberLength = this.currentNumber.length;

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

    if (currentNumberLength >= 5) {
      this.#setFontSize(currentNumberLength, false);
    }

    if (element === 'delete') {
      const clone = this.currentNumber;

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

    if ((this.currentNumber === 0 && this.prevNumber === 0) && element === '=') {
      return;
    }

    if (this.currentNumber === 0 && element !== '.') {
      this.currentNumber = '';
    }

    if (element === '/') {
      if (Number(this.currentNumber) === 0) {
        return;
      }

      const opposite = -Number(this.currentNumber.toString().slice(0, this.currentNumber.length));
      this.currentNumber = opposite;
      this.#errorHandler();
      this.showResult(this.currentNumber);

      return;
    }

    if ((this.currentNumber.toString().includes('.') && element === '.')
      || (OPERATORS.includes(element) && this.currentNumber.toString().includes(element !== '-'))
      || (element === '=' && this.currentNumber.toString().includes('='))) {
      return;
    }

    if (this.currentNumber === 'Ошибка' || this.result === 'Ошибка') {
      if (element === 'c') {
        this.calculating(element);
      }

      return;
    }

    if (this.currentNumber.length <= 15
      || OPERATORS.includes(element)
      || element === '/'
      || element === '=') {
      this.currentNumber += element;
    }

    if (OPERATORS.includes(element)) {
      if (this.prevNumber.length > 1 && Number(this.prevNumber)) {
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
      calculationScreenText.textContent = this.prevNumber;
    }

    if (OPERATORS.includes(element) && Number(this.result !== 0)) {
      this.#errorHandler();
      calculationScreenText.textContent = this.result + element;
    }

    this.calculating(element);

    if (element === '.' && this.currentNumber === 0) {
      this.currentNumber += '.';
    }

    if (element === 'c') {
      this.currentNumber = 0;
      this.prevNumber = 0;
      this.result = 0;
      this.showResult(0);
      calculationScreenText.textContent = this.currentNumber;

      calculationScreenText.style.fontSize = '40px';
      calculationScreenResult.style.fontSize = '90px';
    }

    // this.#errorHandler();
    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {
      this.#errorHandler();

      this.showResult(this.currentNumber);
    }
  }

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

        if (OPERATORS.includes(element) && !isOperation) {
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
          if (this.result.toString().length > 9 && typeof this.result === 'number') {
            this.result = this.result.toExponential(16);
          }
          this.showResult(this.result);
          calculationScreenText.textContent = `${prevNumber}${element}${nextNumber}=`;
          this.currentNumber = 0;
          this.prevNumber = 0;

          if (calculationScreenResult.textContent.length > 16) {
            calculationScreenResult.style.fontSize = '25px';
          }
        }
      });

      if (this.result.toString().length >= 5) {
        const resultLength = this.result.toString().length;

        this.#setFontSize(resultLength);
      }

      if (calculationScreenText.textContent.length >= 5) {
        this.#setFontSize(calculationScreenText.textContent.length, true);
      }
    }

    if (value === '%') {
      if (this.prevNumber) {
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
            this.#errorHandler();
            this.showResult(this.result);
            this.currentNumber = 0;
            this.prevNumber = 0;
            calculationScreenText.textContent = `${prevNumber}${element}${percentNumber}`;
          }
        });
        return;
      }
      this.currentNumber = 0;
      this.showResult(0);
    }
  }

  render() {
    return this.createEl();
  }
}
