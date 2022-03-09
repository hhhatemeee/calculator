const CLICK_BUTTON = 'CLICK_BUTTON';
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
      if (Number.isInteger(action.value)) {
        return {
          ...state,
          currentNumber: `${state.currentNumber += action.value}`,
        }
      }
      return state;
    default:
      return state;
  }
}

export const clickButtonCreator = (value) => ({ type: CLICK_BUTTON, value })

export const clickBtn = () => (dispatch) => (dispatch(clickButtonCreator()));

export default caclculationsReducer;