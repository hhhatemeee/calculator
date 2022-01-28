import Display from './display.js';
import KeyBoard from './Buttons/keyBoad.js';
import ThemeSelector from './themeSelector.js';
import Operations from './operations.js';

document.addEventListener('DOMContentLoaded', () => {
  class Calculator {
    constructor(selector) {
      this.selector = selector;
      this.display = new Display();
      this.keyBoard = new KeyBoard((text) => this.click(text));
      this.operations = new Operations((value) => this.changeResult(value));
    }

    click(text) {
      this.operations.showCalculations(text);
    }

    changeResult(value) {
      this.display.showResult(value)
    }

    init() {
      document.body.innerHTML += `
      <div class="calc calc_${this.selector}" id="calc">
      ${new ThemeSelector().render()}
      <div class="calc__container" id="calcContainer">
        <div class="calc-screen" id="screen">
        </div>
        <div class="calc-buttons" id="calcButtons">
          </div>
        </div>
      </div>`;

      document.getElementById('screen').append(this.operations.render(), this.display.render());

      this.keyBoard.render().forEach((btn) => {
        document.getElementById('calcButtons').append(btn);
      });
    }
  }

  const calc = new Calculator('test');

  calc.init();
});
