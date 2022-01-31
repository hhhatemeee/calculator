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
        element = value;
    }

    if (this.currentNumber === 0 && element !== '.') {
      this.currentNumber = '';
    }

    if ((this.currentNumber.toString().includes('.') && element === '.')
      || (operators.includes(element) && this.currentNumber.toString().includes(element !== '-'))
      || (element === '=' && this.currentNumber.toString().includes('='))) {
      return;
    }

    if (element === '/' && Number(this.currentNumber) === 0) {
      return;
    }
    // debugger;
    if (this.currentNumber.length < 9
      || operators.includes(element)
      || element === '/'
      || element === '=') {
      this.currentNumber += element;
    }

    this.calculating(element);

    if (operators.includes(element)) {
      if (this.prevNumber.length > 1 && Number(this.prevNumber)) {
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

    if (operators.includes(element) && Number(this.result !== 0)) {
      calculationScreenText.textContent = this.result + element;
    }

    if (calculationScreenText.textContent !== this.currentNumber && this.currentNumber !== 0) {
      this.showResult(this.currentNumber);
    }
  }

  calculating(value) {
    const calculationScreenText = document.getElementById('calcText');
    const calculationScreenResult = document.getElementById('resultText');
    const operators = ['+', '-', '÷', '×'];

    const cloneCurrentNumer = Number(this.currentNumber.toString()
      .slice(0, this.currentNumber.toString().length - 1));
    const calcStory = (this.prevNumber.toString() + this.currentNumber.toString());
    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')
      ? calcStory.length - 1
      : calcStory.length)
      .split('');

    if (value === '=') {
      let isOperation = false;

      storyArr.some((element, i) => {
        if (operators.includes(element) && i === 0
          && !this.result
          && this.prevNumber.toString().length > 1) {
          return;
        }

        if (operators.includes(element) && !isOperation) {
          const prevNumber = this.result ? this.result : Number(storyArr.slice(0, i).join(''));
          let nextNumber = Number(storyArr.slice(i + 1).join(''));

          isOperation = true;

          if (nextNumber === 0) {
            nextNumber = prevNumber;
          }

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
              this.result = Math.floor((prevNumber / nextNumber) * 10 ** 4) / 10 ** 4;

              break;
            case '×':
              this.result = prevNumber * nextNumber;

              break;
            default:
              this.showResult(0);
          }

          this.result = this.result.toString().length > 9
            ? this.result.toExponential(3)
            : this.result;
          this.showResult(this.result);
          calculationScreenText.textContent = `${prevNumber}${element}${nextNumber}`;
          this.currentNumber = 0;
          this.prevNumber = 0;
        }
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

    if (value === '%') {
      if (this.prevNumber) {
        storyArr.forEach((element, i) => {
          if (operators.includes(element) && i === 0 && !this.result) {
            return;
          }
          if (operators.includes(element)) {
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

            this.showResult(this.result.length > 9 ? Math.exp(this.result) : this.result);
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

        return;
      }

      this.currentNumber = this.currentNumber.slice(0, this.currentNumber.length - 1);
    }

    if (value === '.' && this.currentNumber === 0) {
      this.currentNumber += '.';
    }
  }

  render() {
    return this.createEl();
  }
}
