const CLICK_BUTTON = 'CLICK_BUTTON';
const SET_PREVNUMBER = 'SET_PREVNUMBER';
const SET_CURRENTNUMBER = 'SET_CURRENTNUMBER';
const SET_RESULT = 'SET_RESULT';
const SET_OPERAION = 'SET_OPERAION';
const SHOW_RESULT = 'SHOW_RESULT';

let initialState = {
  result: 0,
  prevNumber: 0,
  currentNumber: 0,
  operation: '',
}

const caclculationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_BUTTON:
      return {
        ...state,
        currentNumber: `${action.value === '' ? action.value : state.currentNumber += action.value}`,
      }
    case SET_PREVNUMBER:
      return {
        ...state,
        prevNumber: action.value,
      }
    case SET_CURRENTNUMBER:
      return {
        ...state,
        currentNumber: action.value,
      }
    case SET_RESULT:
      return {
        ...state,
        result: action.value,
      }
    case SET_OPERAION:
      return {
        ...state,
        operation: action.value,
      }
    default:
      return state;
  }
}

export const clickButtonCreator = (value) => ({ type: CLICK_BUTTON, value })
export const setPrevNumberCreator = (value) => ({ type: SET_PREVNUMBER, value })
export const setCurrentNumberCreator = (value) => ({ type: SET_CURRENTNUMBER, value })
export const setResultCreator = (value) => ({ type: SET_RESULT, value })
export const setOperationCreator = (value) => ({ type: SET_OPERAION, value })

export const clickBtn = () => (dispatch) => (dispatch(clickButtonCreator()));

export default caclculationsReducer;