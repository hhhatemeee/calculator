import { ReactComponent as Standart } from '../img/Standart.svg';
import { ReactComponent as Graphing } from '../img/Graphing.svg';
import { ReactComponent as Date } from '../img/Date.svg';
import { ReactComponent as Programmer } from '../img/Programmer.svg';
import { ReactComponent as Chemistry } from '../img/Chemistry.svg';
import { ReactComponent as Currency } from '../img/Currency.svg';

const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';

const initialState = {
  currentType: 'Standart',
  types: {
    Calulator: [
      { name: 'Standart', img: <Standart /> },
      { name: 'Scientific', img: <Chemistry /> },
      { name: 'Graphing', img: <Graphing /> },
      { name: 'Programmer', img: <Programmer /> },
      { name: 'Date Calculation', img: <Date /> }],
    Converter: [{ name: 'Currency', img: <Currency /> }]
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
