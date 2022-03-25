const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';
const SET_DISABLED = 'SET_DISABLED';

const initialState = {
  currentType: 'Standart',
  types: {
    Calculator: [
      { name: 'Standart', imgName: 'Standart' },
      { name: 'Scientific', imgName: 'Chemistry' },
      { name: 'Graphing', imgName: 'Graphing' },
      { name: 'Programmer', imgName: 'Programmer' },
      { name: 'Date Calculation', imgName: 'Date' }],
    Converter: [{ name: 'Currency', imgName: 'Currency' }]
  },
  disabledCalcs: {
    Calculator: {
      Standart: false,
      Scientific: false,
      Graphing: false,
      Programmer: false,
      'Date Calculation': false,
    },
    Converter: {
      Currency: false,
    }
  },
};

const calculationTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TYPE:
      return {
        ...state,
        currentType: action.name,
      }
    case SET_DISABLED:
      const result = {
        ...state.disabledCalcs,
        Calculator: { ...state.disabledCalcs.Calculator },
        Converter: { ...state.disabledCalcs.Converter }
      };
      console.log(action);
      Object.keys(state.disabledCalcs).forEach((key) => {
        Object.keys(state.disabledCalcs[key]).forEach((calc) => {
          if (calc === action.name) {
            result[key][calc] = action.value;
          }
        })

      });

      return {
        ...state,
        disabledCalcs: result,
      }
    default:
      return state
  }
};

export const setCurrentTypeCreator = (name) => ({ type: SET_CURRENT_TYPE, name });
export const setDisabledTypeCreator = ({ name, value }) => ({ type: SET_DISABLED, name, value });


export default calculationTypesReducer;
