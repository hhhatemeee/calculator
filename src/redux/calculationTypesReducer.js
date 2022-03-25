const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';
const SET_DISABLED = 'SET_DISABLED';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM = 'ADD_ITEM';

const initialState = {
  currentType: 'Standart',
  types: {
    Calculator: [
      { name: 'Standart', imgName: 'Standart', section: 'Calculator' },
      { name: 'Scientific', imgName: 'Chemistry', section: 'Calculator' },
      { name: 'Graphing', imgName: 'Graphing', section: 'Calculator' },
      { name: 'Programmer', imgName: 'Programmer', section: 'Calculator' },
      { name: 'Date Calculation', imgName: 'Date', section: 'Calculator' }],
    Converter: [{ name: 'Currency', imgName: 'Currency', section: 'Converter' }]
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
    case DELETE_ITEM:
      return {
        ...state,
        types: {
          ...state.types,
          [action.section]: [
            ...state.types[action.section].filter((item) => item.name !== action.name),
          ]
        }
      }
    case ADD_ITEM:
      const namesArr = [];

      initialState.types[action.section].forEach(item => {
        namesArr.push(item.name);
      })

      if (namesArr.includes(action.name)) {
        const newItem = {
          name: action.name,
          imgName: '',
          section: action.name,
        }
        return {
          ...state,
          types: {
            ...state.types,
            [action.section]: [
              ...state.types[action.section], newItem,
            ]
          }
        }
      }
    default:
      return state
  }
};

export const setCurrentTypeCreator = (name) => ({ type: SET_CURRENT_TYPE, name });
export const setDisabledTypeCreator = ({ name, value }) => ({ type: SET_DISABLED, name, value });
export const setDeleteItemCreator = ({ section, name }) => ({ type: DELETE_ITEM, section, name });
export const setAddItemCreator = ({ section, name }) => ({ type: ADD_ITEM, section, name });


export default calculationTypesReducer;
