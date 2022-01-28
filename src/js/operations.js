import Display from "./display.js";

export default class Operations extends Display {
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

    if (calculationScreenText.textContent !== this.state) {
      calculationScreenText.textContent = this.state;
    }
  }

  render() {
    return this.createEl();
  }
}
