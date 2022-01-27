import Button from "./button.js";

const MOCK_BTN = [
  {
    name: 'btn_ac',
    color: 'btn_bg_gray',
    text: 'c',
  },
  {
    name: 'btn_plus-minus',
    color: 'btn_bg_gray',
    text: '<span class="btn__plus-minus">/</span>',
  },
  {
    name: 'btn_percent',
    color: 'btn_bg_gray',
    text: '%',
  },
  {
    name: 'btn_division',
    color: 'btn_bg_blue',
    text: '÷',
  },
  {
    name: 'btn_seven',
    color: ' ',
    text: '7',
  },
  {
    name: 'btn_eigth',
    color: ' ',
    text: '8',
  },
  {
    name: 'btn_nine',
    color: ' ',
    text: '9',
  },
  {
    name: 'btn_multiplication',
    color: 'btn_bg_blue',
    text: '<span>+</span>',
  },
  {
    name: 'btn_four',
    color: ' ',
    text: '4',
  },
  {
    name: 'btn_five',
    color: ' ',
    text: '5',
  },
  {
    name: 'btn_six',
    color: ' ',
    text: '6',
  },
  {
    name: 'btn_minus',
    color: 'btn_bg_blue',
    text: '-',
  },
  {
    name: 'btn_one',
    color: ' ',
    text: '1',
  },
  {
    name: 'btn_two',
    color: ' ',
    text: '2',
  },
  {
    name: 'btn_three',
    color: ' ',
    text: '3',
  },
  {
    name: 'btn_plus',
    color: 'btn_bg_blue',
    text: '+',
  },
  {
    name: 'btn_dot',
    color: ' ',
    text: '.',
  },
  {
    name: 'btn_btn_zero',
    color: ' ',
    text: '0',
  },
  {
    name: 'btn_delete',
    color: ' ',
    text: '<div class="btn__delete" id="btnDelete"><span>+</span></div>',
  },
  {
    name: 'btn_equal',
    color: 'btn_bg_blue',
    text: '=',
  },
];

class ButtonList {
  generateButtons() {
    let result = ' ';

    MOCK_BTN.forEach((btn) => {
      result += `${new Button({
        name: btn.name,
        color: btn.color,
        text: btn.text,
      }).render()}`;
    });

    return result;
  }

  render() {
    return `<div class="calc-buttons">${this.generateButtons()}</div>`;
  }
}

export default ButtonList;
