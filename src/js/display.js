class Display {
  constructor() {
    this.state = 0;
  }

  static createEl() {
    const resultText = document.createElement('p');

    resultText.className = 'calc-screen__result';
    resultText.id = 'resultText';
    resultText.textContent = 0;

    return resultText;
  }

  showResult(value) {
    const resultScreenText = document.getElementById('resultText')

    this.state = value;
    resultScreenText.textContent = this.state;
  }

  render() {
    return Display.createEl();
  }
}

export default Display;
