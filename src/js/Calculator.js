import Display from './display.js';
import KeyBoard from './Buttons/keyBoad.js';
import ThemeSelector from './themeSelector.js';
import Operations from './operations.js';

export default class Calculator {
  constructor(selector) {
    this.selector = selector;
    this.display = new Display();
    this.keyBoard = new KeyBoard((text) => this.#click(text));
    this.operations = new Operations((value) => this.#changeResult(value));
    this.themeSelector = new ThemeSelector(() => Calculator.#changeTheme());
  }

  #click(text) {
    this.operations.showCalculations(text);
  }

  #changeResult(value) {
    this.display.showResult(value);
  }

  static #changeTheme() {
    const bodyCalc = document.getElementById('calc').classList;
    bodyCalc.toggle('calc_theme_dark');
  }

  get templateMarckup() {
    return (
      `<div class="calc calc_${this.selector}" id="calc">
      <div class="theme">
        <div class="theme__container">
          <label for="checkbox" class="theme__selector" id="toggleSelector">
            <i class="icon-sun"></i>
            <i class="icon-moon-1"></i>
            <div class="theme__ball" id="toggleBall"></div>
          </label>
        </div>
      </div>
    <div class="calc__container" id="calcContainer">
      <div class="calc-screen" id="screen">
      </div>
      <div class="calc-buttons" id="calcButtons">
        </div>
      </div>
    </div>`);
  }

  init() {
    document.body.innerHTML += this.templateMarckup;

    document.getElementById('toggleSelector').before(this.themeSelector.render());
    document.getElementById('screen').append(this.operations.render(), this.display.render());

    this.keyBoard.render().forEach((btn) => {
      document.getElementById('calcButtons').append(btn);
    });
  }
}
