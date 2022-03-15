let initialState = [
  {
    name: 'btn_ac',
    color: 'btn_bg_gray',
    text: 'c',
    value: 'reset',
  },
  {
    name: 'btn_plus-minus',
    color: 'btn_bg_gray',
    text: <span className="btn__plus-minus">/</span>,
    value: 'plus-minus',
  },
  {
    name: 'btn_percent',
    color: 'btn_bg_gray',
    text: '%',
    value: 'percent',
  },
  {
    name: 'btn_division',
    color: 'btn_bg_blue',
    text: '÷',
    value: 'division',
  },
  {
    name: 'btn_seven',
    color: ' ',
    text: '7',
    value: 7,
  },
  {
    name: 'btn_eigth',
    color: ' ',
    text: '8',
    value: 8,
  },
  {
    name: 'btn_nine',
    color: ' ',
    text: '9',
    value: 9,
  },
  {
    name: 'btn_multiplication',
    color: 'btn_bg_blue',
    text: '×',
    value: 'multiplication',
  },
  {
    name: 'btn_four',
    color: ' ',
    text: '4',
    value: 4,
  },
  {
    name: 'btn_five',
    color: ' ',
    text: '5',
    value: 5,
  },
  {
    name: 'btn_six',
    color: ' ',
    text: '6',
    value: 6,
  },
  {
    name: 'btn_minus',
    color: 'btn_bg_blue',
    text: '-',
    value: 'minus',
  },
  {
    name: 'btn_one',
    color: ' ',
    text: '1',
    value: 1,
  },
  {
    name: 'btn_two',
    color: ' ',
    text: '2',
    value: 2,
  },
  {
    name: 'btn_three',
    color: ' ',
    text: '3',
    value: 3,
  },
  {
    name: 'btn_plus',
    color: 'btn_bg_blue',
    text: '+',
    value: 'plus',
  },
  {
    name: 'btn_dot',
    color: ' ',
    text: '.',
    value: 'dot',
  },
  {
    name: 'btn_btn_zero',
    color: ' ',
    text: '0',
    value: 0,
  },
  {
    name: 'btn_delete',
    color: ' ',
    text: <div className="btn__delete" id="btnDelete"><span>+</span></div>,
    value: 'delete',
  },
  {
    name: 'btn_equal',
    color: 'btn_bg_blue',
    text: '=',
    value: 'equal',
  },
];

const buttonsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default buttonsReducer;