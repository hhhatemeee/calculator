const SET_CURRENCY_LIST = 'SET_CURRENCY_LIST';

const initialState = {
  currencyList: ['USD', 'RUB', 'EUR', 'KYD', 'COP', 'BND', 'ALL', 'XCD', 'EUR', 'BBD', 'BTN', 'BND', 'XAF', 'CUP', 'USD', 'FKP', 'GIP', 'HUF', 'IRR', 'JMD', 'AUD', 'LAK'],
};

const convertationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY_LIST:
      return {
        ...state,
        currencyList: action.list,
      }
    default:
      return state
  }
};

export const setCurrencyListCreator = (list) => ({ type: SET_CURRENCY_LIST, list });

export default convertationReducer;
