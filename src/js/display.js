class Display {
  constructor() {
    this.state = 0;
  }

  static createEl() {
    const resultText = document.createElement('p');

    resultText.className = 'calc-screen__result';
    resultText.id = 'resultText';
    resultText.textContent = 612;

    return resultText;
  }

  render() {
    return Display.createEl();
  }
}

export default Display;
