import Display from "./display.js";

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

  showCalculations(value) {
    const calculationScreenText = document.getElementById('calcText');
    const operators = ['×', '÷', '-', '+'];
    let element = value;

    if (this.currentNumber.length === 6) {
      return;
    }

    if (this.currentNumber === 0) {
      this.currentNumber = '';
    }

    if (element === 'delete') {
      const clone = this.currentNumber;

      this.calculating(element);

      if (this.currentNumber !== clone) {
        this.showResult(this.currentNumber);
      }

      return;
    }

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
        element;
    }

    if (element === '/' && Number(this.currentNumber) === 0) {
      return;
    }

    this.currentNumber += element;
    this.calculating(element);

    if (operators.includes(element)) {
      this.prevNumber = this.currentNumber;
      this.currentNumber = 0;
      calculationScreenText.textContent = this.prevNumber;
    }

    if (operators.includes(element) && Number(this.result > 0)) {
      calculationScreenText.textContent = this.result + element;
    }

    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {
      this.showResult(this.currentNumber);
    }
  }

  calculating(value) {
    const operators = ['+', '-', '*', '÷', '×'];
    const calculationScreenText = document.getElementById('calcText');

    const cloneCurrentNumer = Number(this.currentNumber.slice(0, this.currentNumber.length - 1));

    if (value === '=') {
      calculationScreenText.textContent = this.prevNumber + this.currentNumber;

      const calcStory = (this.prevNumber + this.currentNumber);
      const calcLine = calcStory.slice(0, calcStory.length - 1).split('');

      calcLine.forEach((element, i) => {
        if (operators.includes(element)) {
          const prevNumber = Number(calcLine.slice(operators.forEach((op) => {
            calcLine.lastIndexOf(op, i);
          }), i).join(''));
          const nextNumber = Number(calcLine.slice(i + 1, operators.forEach((op) => {
            calcLine.indexOf(op, i);
          })).join(''));

          switch (element) {
            case '+':
              this.showResult((prevNumber ? prevNumber + nextNumber : this.result + nextNumber));
              this.result = (prevNumber ? prevNumber + nextNumber : this.result + nextNumber);
              this.currentNumber = 0;
              calculationScreenText.textContent = 0;
              break;
            case '-':
              this.showResult(prevNumber ? prevNumber - nextNumber : this.result - nextNumber);
              this.result = (prevNumber ? prevNumber - nextNumber : this.result - nextNumber);
              this.currentNumber = 0;
              calculationScreenText.textContent = 0;

              break;
            case '÷':
              this.showResult(prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4
                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);
              this.result = (prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4
                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);
              this.currentNumber = 0;
              calculationScreenText.textContent = 0;

              break;
            case '×':
              this.showResult(prevNumber ? prevNumber * nextNumber : this.result * nextNumber);
              this.result = (prevNumber ? prevNumber * nextNumber : this.result * nextNumber);
              this.currentNumber = 0;
              calculationScreenText.textContent = 0;

              break;
            default:
              this.showResult(0);
          }
        }
      });
    }

    if (value === 'c') {
      this.currentNumber = 0;
      this.prevNumber = 0;
      this.result = 0;
      this.showResult(0);
      calculationScreenText.textContent = this.currentNumber;
    }

    if (value === '%') {
      this.showResult(cloneCurrentNumer === 0 ? this.result / 100 : cloneCurrentNumer / 100);
      this.result = cloneCurrentNumer / 100;
      this.prevNumber = 0;
      this.currentNumber = 0;
    }

    if (value === '/') {
      if (Number(this.currentNumber) === 0) {
        return;
      }
      const opposite = -cloneCurrentNumer;
      this.currentNumber = opposite;
    }

    if (value === 'delete') {
      if (Number(this.currentNumber) === 0 || this.currentNumber.length < 2) {
        this.currentNumber = 0;
      } else {
        this.currentNumber = this.currentNumber.slice(0, this.currentNumber.length - 1);
        console.log(this.currentNumber);
      }
    }
  }

  render() {
    return this.createEl();
  }
}
