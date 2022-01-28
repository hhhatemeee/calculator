import Display from './display.js';
import KeyBoard from './Buttons/keyBoad.js';
import ThemeSelector from './themeSelector.js';

document.addEventListener('DOMContentLoaded', () => {
  class Calculator {
    constructor(selector) {
      this.selector = selector;
      this.display = new Display();
      this.keyBoard = new KeyBoard((text) => this.click(text));
    }

    click(text) {
      this.display.showCalculations(text);
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

      this.display.render().map((screenText) => {
        document.getElementById('screen').append(screenText);
      });

      this.keyBoard.render().map((btn) => {
        document.getElementById('calcButtons').append(btn);
      });
    }
  }

  const calc = new Calculator('test');

  calc.init();
});
