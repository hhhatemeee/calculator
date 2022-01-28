class Display {
  constructor() {
    this.state = 0;
  }

  showCalculations(calculations) {
    let calculationScreenText = document.getElementById('calcText');

    if (this.state.length === 26) {
      return;
    }

    if (this.state === 0) {
      this.state = '';
    }

    this.state += calculations;

    if (calculationScreenText.textContent !== this.state) {
      calculationScreenText.textContent = this.state;
    }
  }

  createEl() {
    const calculationText = document.createElement('p');
    const resultText = document.createElement('p');

    calculationText.className = 'calc-screen__calculations';
    resultText.className = 'calc-screen__result';
    calculationText.id = 'calcText';
    calculationText.textContent = this.state;
    resultText.id = 'resultText';
    resultText.textContent = 612;

    return [calculationText, resultText];
  }

  render() {
    return this.createEl();
  }
}

export default Display;
