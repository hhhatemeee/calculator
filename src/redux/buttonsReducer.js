let initialState = [
  {
    name: 'btn_ac',
    color: 'btn_bg_gray',
    text: 'c',
    value: 'reset',
    isOperation: false,
  },
  {
    name: 'btn_plus-minus',
    color: 'btn_bg_gray',
    text: <span className="btn__plus-minus">/</span>,
    value: 'plus-minus',
    isOperation: true,
  },
  {
    name: 'btn_percent',
    color: 'btn_bg_gray',
    text: '%',
    value: 'percent',
    isOperation: true,
  },
  {
    name: 'btn_division',
    color: 'btn_bg_blue',
    text: '÷',
    value: 'division',
    isOperation: true,
  },
  {
    name: 'btn_seven',
    color: ' ',
    text: '7',
    value: 7,
    isOperation: false,
  },
  {
    name: 'btn_eigth',
    color: ' ',
    text: '8',
    value: 8,
    isOperation: false,
  },
  {
    name: 'btn_nine',
    color: ' ',
    text: '9',
    value: 9,
    isOperation: false,
  },
  {
    name: 'btn_multiplication',
    color: 'btn_bg_blue',
    text: '×',
    value: 'multiplication',
    isOperation: true,
  },
  {
    name: 'btn_four',
    color: ' ',
    text: '4',
    value: 4,
    isOperation: false,
  },
  {
    name: 'btn_five',
    color: ' ',
    text: '5',
    value: 5,
    isOperation: false,
  },
  {
    name: 'btn_six',
    color: ' ',
    text: '6',
    value: 6,
    isOperation: false,
  },
  {
    name: 'btn_minus',
    color: 'btn_bg_blue',
    text: '-',
    value: 'minus',
    isOperation: true,
  },
  {
    name: 'btn_one',
    color: ' ',
    text: '1',
    value: 1,
    isOperation: false,
  },
  {
    name: 'btn_two',
    color: ' ',
    text: '2',
    value: 2,
    isOperation: false,
  },
  {
    name: 'btn_three',
    color: ' ',
    text: '3',
    value: 3,
    isOperation: false,
  },
  {
    name: 'btn_plus',
    color: 'btn_bg_blue',
    text: '+',
    value: 'plus',
    isOperation: true,
  },
  {
    name: 'btn_dot',
    color: ' ',
    text: '.',
    value: 'dot',
    isOperation: true,
  },
  {
    name: 'btn_btn_zero',
    color: ' ',
    text: '0',
    value: 0,
    isOperation: false,
  },
  {
    name: 'btn_delete',
    color: ' ',
    text: <div className="btn__delete" id="btnDelete"><span>+</span></div>,
    value: 'delete',
    isOperation: false,
  },
  {
    name: 'btn_equal',
    color: 'btn_bg_blue',
    text: '=',
    value: 'equal',
    isOperation: false,
  },
  {
    name: 'btn_mock',
    color: 'btn_bg_gray',
    text: '',
    value: 'mock',
    isOperation: true,
  },
  {
    name: 'btn_mock_1',
    color: 'btn_bg_gray',
    text: '',
    value: 'mock2',
    isOperation: true,
  }
];


const buttonsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default buttonsReducer;