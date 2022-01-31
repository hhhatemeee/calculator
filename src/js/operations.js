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
    const calculationScreenResult = document.getElementById('resultText');
    const operators = ['×', '÷', '-', '+'];
    let element = value;

    if (this.currentNumber.length === 6) {
      calculationScreenResult.style.fontSize = `${60}px`;
      calculationScreenResult.style.marginTop = `${41}px`;
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

    if (this.currentNumber === 0 && element !== '.') {
      this.currentNumber = '';
    }

    if ((this.currentNumber.toString().includes('.') && element === '.')
      || (operators.includes(element) && this.currentNumber.toString().includes(element))) {
      return;
    }

    if (element === '/' && Number(this.currentNumber) === 0) {
      return;
    }

    if (operators.includes(element) && this.prevNumber.toString().includes(element)) {
      return;
    }

    if (this.currentNumber.length < 9 || operators.includes(element) || element === '/' || element === '=') {
      this.currentNumber += element;
    }

    this.calculating(element);

    if (operators.includes(element)) {
      if (this.prevNumber.length > 1) {
        this.prevNumber = this.prevNumber.slice(0, this.prevNumber.length - 1);
        this.prevNumber += this.currentNumber;
        calculationScreenText.textContent = this.prevNumber;
        this.currentNumber = 0;

        return;
      }

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
    const calculationScreenResult = document.getElementById('resultText');

    const cloneCurrentNumer = Number(this.currentNumber.toString()
      .slice(0, this.currentNumber.toString().length - 1));

    const calcStory = (this.prevNumber.toString() + this.currentNumber.toString());
    const calcLine = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%') ? calcStory.length - 1 : calcStory.length).split('');

    console.log(calcStory);
    // calcLine.forEach((el, i) => {
    //   if (operators.includes(el)) {
    //     const prevNumber = Number(calcLine.slice(0, i).join(''));
    //     let nextNumber = Number(calcLine.slice(i + 1).join(''));
    //   }
    // });

    if (value === '=') {
      calcLine.some((element, i) => {
        if (operators.includes(element) && i === 0 && !this.result) {
          return;
        }

        if (operators.includes(element)) {
          const prevNumber = Number(calcLine.slice(0, i).join(''));
          let nextNumber = Number(calcLine.slice(i + 1).join(''));

          if (nextNumber === 0) {
            nextNumber = prevNumber;
          }

          if (this.result.length === 1) {
            calculationScreenResult.style.fontSize = `${60}px`;
            calculationScreenResult.style.marginTop = `${41}px`;
          }
          switch (element) {
            case '+':
              this.showResult(prevNumber ? prevNumber + nextNumber : this.result + nextNumber);
              calculationScreenText.textContent = prevNumber ? `${prevNumber}+${nextNumber}` : `${this.result}+${nextNumber}`;

              this.result = (prevNumber ? prevNumber + nextNumber : this.result + nextNumber);
              this.currentNumber = 0;
              this.prevNumber = 0;

              break;
            case '-':
              this.showResult(prevNumber ? prevNumber - nextNumber : this.result - nextNumber);
              calculationScreenText.textContent = prevNumber ? `${prevNumber}-${nextNumber}` : `${this.result}-${nextNumber}`;

              this.result = (prevNumber ? prevNumber - nextNumber : this.result - nextNumber);
              this.currentNumber = 0;
              this.prevNumber = 0;

              break;
            case '÷':
              this.showResult(prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4
                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);
              calculationScreenText.textContent = prevNumber ? `${prevNumber}÷${nextNumber}` : `${this.result}÷${nextNumber}`;

              this.result = (prevNumber ? Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4
                : Math.floor((this.result / nextNumber) * 10 ** 4) / 10 ** 4);
              this.currentNumber = 0;
              this.prevNumber = 0;

              break;
            case '×':
              this.showResult(prevNumber ? prevNumber * nextNumber : this.result * nextNumber);
              calculationScreenText.textContent = prevNumber ? `${prevNumber}×${nextNumber}` : `${this.result}×${nextNumber}`;

              this.result = (prevNumber ? prevNumber * nextNumber : this.result * nextNumber);
              this.currentNumber = 0;
              this.prevNumber = 0;

              break;
            default:
              this.showResult(0);
          }
        }

        return operators.includes(element);
      });

      if (this.result.toString().length > 6) {
        calculationScreenResult.style.fontSize = `${60}px`;
        calculationScreenResult.style.marginTop = `${41}px`;
      }
    }

    if (value === 'c') {
      this.currentNumber = 0;
      this.prevNumber = 0;
      this.result = 0;
      this.showResult(0);
      calculationScreenText.textContent = this.currentNumber;

      calculationScreenResult.style.fontSize = `${96}px`;
      calculationScreenResult.style.marginTop = `${0}px`;
    }

    if (value === '%' && this.prevNumber) {
      calcLine.forEach((element, i) => {
        if (operators.includes(element) && i === 0 && !this.result) {
          return;
        }
        if (operators.includes(element)) {
          const prevNumber = this.result ? this.result : Number(calcLine.slice(0, i).join(''));
          const nextNumber = Number(calcLine.slice(i + 1).join(''));
          const fractionNumber = (prevNumber * nextNumber) / 100;
          const percentProcent = nextNumber / 100;

          console.log(prevNumber, nextNumber);
          switch (element) {
            case '+':
              this.result = prevNumber + fractionNumber;
              this.showResult(this.result);
              this.currentNumber = 0;
              this.prevNumber = 0;
              calculationScreenText.textContent = prevNumber ? `${prevNumber}+${fractionNumber}` : `${prevNumber}+${fractionNumber}`;

              break;
            case '×':
              this.result = prevNumber * percentProcent;
              this.showResult(this.result);
              this.currentNumber = 0;
              this.prevNumber = 0;
              calculationScreenText.textContent = prevNumber ? `${prevNumber}*${percentProcent}` : `${prevNumber}*${percentProcent}`;

              break;
            default:
          }
        }
      });
    }

    if (value === '/') {
      if (Number(this.currentNumber) === 0) {
        return;
      }
      const opposite = -cloneCurrentNumer;
      this.currentNumber = opposite;
    }

    if (value === 'delete') {
      if (this.currentNumber === 0 && this.result > 0) {
        calculationScreenText.textContent = this.currentNumber;
      }
      if (Number(this.currentNumber) === 0 || this.currentNumber.length < 2) {
        this.currentNumber = 0;
      } else {
        this.currentNumber = this.currentNumber.slice(0, this.currentNumber.length - 1);
      }
    }
  }

  render() {
    return this.createEl();
  }
}
