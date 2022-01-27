import Display from './display.js';
import ButtonList from './Buttons/buttonsList.js';
import ThemeSelector from './themeSelector.js';

class Calculator {
  constructor(selector) {
    this.selector = selector;
  }

  init() {
    document.body.innerHTML += `<div class="calc calc_${this.selector}">
    ${new ThemeSelector().render()}
    <div class="calc__container">
    ${new Display().render()}
    ${new ButtonList().render()}
    </div>
    </div>`;
  }
}

const calc = new Calculator('test');

calc.init();
