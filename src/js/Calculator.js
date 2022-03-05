import Display from './display.js';
import KeyBoard from './Buttons/keyBoad.js';
import ThemeSelector from './themeSelector.js';
import Operations from './operations.js';
import splittingNumber from './splittingNumber.js';
import WindowLimit from './windowLimit.js';
import ConvertationService from './convertationService.js';

export default class Calculator {
  constructor(selector) {
    this.selector = selector;
    this.display = new Display();
    this.keyBoard = new KeyBoard({ callBack: (text) => this.#click(text) });
    this.operations = new Operations((value) => this.#changeResult(value));
    this.themeSelector = new ThemeSelector(() => Calculator.#changeTheme());
    this.serviceConvertation = new ConvertationService('CC', (isHidding, serviceName) => this.showWindow(isHidding, serviceName));
  }

  #click(text) {
    this.operations.showCalculations(text);
  }

  switchService(service) {
    this.serviceConvertation.switchService(service);
  }

  showWindow(bool, serviceName) {
    this.windowLimit = new WindowLimit((service) => this.switchService(service));

    if (!document.getElementById(this.windowLimit.render().id)) {
      document.getElementById('calc').append(this.windowLimit.render());
    }

    setTimeout(() => this.windowLimit.toggleHide(bool, serviceName), 0);
  }

  #changeResult(value) {
    this.display.showResult(splittingNumber(value));
  }

  static #changeTheme() {
    const bodyCalc = document.getElementById('calc');

    if (bodyCalc) {
      bodyCalc.classList.toggle('calc_theme_dark');

      return;
    }

    console.warn('bodyCalc is undefined');
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
      <div class ="calc-screen__calculations-container" id="calculationContainer">
      </div>
      </div>
      <div class="calc-buttons" id="calcButtons">
        </div>
      </div>
    </div>`);
  }

  init() {
    document.body.innerHTML += this.templateMarckup;

    document.getElementById('toggleSelector').before(this.themeSelector.render());
    this.operations.render().map((element) => document.getElementById('calculationContainer').append(element));
    document.getElementById('screen').append(this.display.render());

    this.keyBoard.render().forEach((btn) => {
      document.getElementById('calcButtons').append(btn);
    });
  }
}
