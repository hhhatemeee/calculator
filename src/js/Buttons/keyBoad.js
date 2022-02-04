import Button from './button.js';
import { MOCK_BTN } from '../variables.js';
import getFunction from '../getFunction.js';

class KeyBoard {
  constructor(props) {
    this.onClick = getFunction.call(this, props.callBack);
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
