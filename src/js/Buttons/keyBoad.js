import Button from './button.js';
import { MOCK_BTN } from '../variables.js';

class KeyBoard {
  constructor(calc) {
    this.calc = calc;
  }

  #generateButtons() {
    return (MOCK_BTN.map((btn) => new Button({
      name: btn.name,
      color: btn.color,
      text: btn.text,
      calc: this.calc,
    }).render()));
  }

  render() {
    return this.#generateButtons();
  }
}

export default KeyBoard;
