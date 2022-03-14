import Standart from '../img/Standart.png';
import Graphing from '../img/Graphing.png';
import Date from '../img/Date.svg';
import Programmer from '../img/Programmer.png';
import Chemistry from '../img/Chemistry.png';
import Currency from '../img/Currency.svg';

const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';

const initialState = {
  currentType: 'Standart',
  types: {
    Calulator: [
      { name: 'Standart', img: Standart },
      { name: 'Scientific', img: Chemistry },
      { name: 'Graphing', img: Graphing },
      { name: 'Programmer', img: Programmer },
      { name: 'Date Calculation', img: Date }],
    Converter: [{ name: 'Currency', img: Currency }]
  }
};

const calculationTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TYPE:
      return {
        ...state,
        currentType: action.name,
      }
    default:
      return state
  }
};

export const setCurrentTypeCreator = (name) => ({ type: SET_CURRENT_TYPE, name });


export default calculationTypesReducer;
