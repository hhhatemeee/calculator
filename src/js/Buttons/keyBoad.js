import Button from './button.js';
import { MOCK_BTN } from '../variables.js';
import callFunction from '../callFunction.js';

class KeyBoard {
  constructor(props) {
    this.onClick = callFunction.call(this, props.callBack);
  }

  #generateButtons() {
    return (MOCK_BTN.map((btn) => {
      const button = new Button({
        name: btn.name,
        color: btn.color,
        text: btn.text,
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
