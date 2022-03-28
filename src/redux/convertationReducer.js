const SET_CURRENCY_LIST = 'SET_CURRENCY_LIST';
const SET_LOADING = 'SET_LOADING';
const SET_CURRENT_COURSE = 'SET_CURRENT_COURSE';
const SET_CURRENT_SERVICE = 'SET_CURRENT_SERVICE';
const SET_FETCHING = 'SET_FETCHING';

const initialState = {
  currentService: 'CC',
  currencyList: ['RUB', 'EUR', 'KYD', 'COP', 'ALL', 'XCD', 'BBD', 'BTN', 'BND', 'XAF', 'CUP', 'USD', 'FKP', 'GIP', 'HUF', 'IRR', 'JMD', 'AUD', 'LAK'],
  isLoading: false,
  currentCourse: 1,
  services: [
    { name: 'CC', value: 'CC' },
    { name: 'FCA', value: 'FCA' },
    { name: 'OE', value: 'OE' }
  ],
  servicesUrl: {
    CC: 'currencyconverterapi.com',
    OE: 'openexchangerates.org',
    FCA: 'freecurrencyapi.net',
  },
  isFetching: false,
};

const convertationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY_LIST:
      return {
        ...state,
        isFetching: false,
        currencyList: action.list,
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case SET_CURRENT_COURSE:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        currentCourse: Number(action.value) || state.currentCourse,
      }
    case SET_CURRENT_SERVICE:
      return {
        ...state,
        currentService: action.value,
      }
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.bool,
      }
    default:
      return state
  }
};

export const setCurrencyListCreator = (list) => ({ type: SET_CURRENCY_LIST, list });
export const setLoadingCreator = (isLoading) => ({ type: SET_LOADING, isLoading });
export const setCurrentCourseCreator = (value) => ({ type: SET_CURRENT_COURSE, value });
export const setCurrentServiceCreator = (value) => ({ type: SET_CURRENT_SERVICE, value });
export const setFetchingCreator = (bool) => ({ type: SET_FETCHING, bool });

export default convertationReducer;
