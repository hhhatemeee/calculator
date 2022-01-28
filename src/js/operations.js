import Display from "./display.js";

export default class Operations extends Display {
  constructor(callback) {
    super();
    this.showResult = callback;
  }

  createEl() {
    const calculationText = document.createElement('p');
    calculationText.className = 'calc-screen__calculations';
    calculationText.id = 'calcText';
    calculationText.textContent = this.state;
    return calculationText;
  }

  showCalculations(calculations) {
    const calculationScreenText = document.getElementById('calcText');

    if (this.state.length === 26) {
      return;
    }

    if (this.state === 0) {
      this.state = '';
    }

    this.state += calculations;
    console.log(calculations);
    this.calculating(calculations);

    if (calculationScreenText.textContent !== this.state) {
      calculationScreenText.textContent = this.state;
    }
  }

  calculating(value) {
    let a = 0;
    const operators = ['+', '-', '*', '÷', '×'];

    if (this.state.length === 1) {
      a = this.state;
      console.log(a);
    } else {
      a = this.state.slice(0, this.state.length - 1);
    }
    if (value === '=') {
      const calcStory = this.state.slice(0, this.state.length - 1).split('');

      calcStory.forEach((element, i) => {
        if (operators.includes(element)) {
          const prevNumber = Number(calcStory.slice(operators.forEach((op) => {
            calcStory.lastIndexOf(op, i);
          }), i).join(''));
          const nextNumer = Number(calcStory.slice(i + 1, operators.forEach((op) => {
            calcStory.indexOf(op, i);
          })).join(''));

          switch (element) {
            case '+':
              this.showResult(prevNumber + nextNumer);
              this.state = 0;
              break;
            case '-':
              this.showResult(prevNumber - nextNumer);
              this.state = 0;
              break;
            case '÷':
              this.showResult(Math.floor((prevNumber / nextNumer) * 10 ** 4) / 10 ** 4);
              this.state = 0;
              break;
            case '×':
              this.showResult(prevNumber * nextNumer);
              this.state = 0;
              break;
            default:
              this.showResult(0);
          }
        }
      });
    }

    if (value === 'c') {
      this.state = 0;
      this.showResult(0);
    }

    if (value === '%') {
      this.showResult(a / 100);
      this.state = 0;
    }

    if (value === '/') {
      const opposite = (a > 0 ? -a : a);
      this.state = opposite;
    }
  }

  render() {
    return this.createEl();
  }
}
