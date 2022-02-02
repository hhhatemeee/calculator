import Button from './button.js';
import { MOCK_BTN } from '../variables.js';

class KeyBoard {
  constructor(callback) {
    this.onClick = callback;
  }

  #generateButtons() {
    return (MOCK_BTN.map((btn) => {
      const button = new Button({
        name: btn.name,
        color: btn.color,
        text:
          [
            { values: 2 },
            { values: 3 },
            { values: 5 },
          ],
        value: btn.value,
        onClick: this.onClick,
      });

      return button.render();
    }));
  }

  render() {
    return this.#generateButtons();
  }
}

export default KeyBoard;
