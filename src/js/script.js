import Display from './display.js';
import KeyBoard from './Buttons/keyBoad.js';
import ThemeSelector from './themeSelector.js';

document.addEventListener('DOMContentLoaded', () => {
  class Calculator {
    constructor(selector) {
      this.selector = selector;
      this.buttons = {};
    }

    register(keyBoard) {
      this.buttons[keyBoard.name] = keyBoard;
      keyBoard.calc = this;
    }

    click(text) {
      console.log(text);
    }

    init() {
      const keyBoard = new KeyBoard(this);
      // console.log(keyBoard.calc);
      document.body.innerHTML += `<div class="calc calc_${this.selector}" id="calc">
      ${new ThemeSelector().render()}
      <div class="calc__container" id="calcContainer">
      ${new Display().render()}
        <div class="calc-buttons" id="calcButtons">
        </div>
      </div>
    </div>`;
      keyBoard.render().map((btn) => {
        document.getElementById('calcButtons').append(btn);
      });
    }
  }

  const calc = new Calculator('test');

  calc.init();
});
