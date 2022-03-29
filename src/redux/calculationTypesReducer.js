import { CALC_TYPES } from "../variables";

const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';
const SET_DISABLED = 'SET_DISABLED';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const ADD_SECTION = 'ADD_SECTION';
const DELETE_SECTION = 'DELETE_SECTION';
const MOVE_ITEM = 'MOVE_ITEM';
const MOVE_SECTION = 'MOVE_SECTION';
const SET_NAME_SECTION = 'SET_NAME_SECTION';
const SET_ICON = 'SET_ICON';

const initialState = {
  currentType: 'Standart',
  currentId: 0,
  types: [
    {
      name: 'Calculator',
      id: 0,
      calcList: [
        { name: 'Standart', imgName: 'Standart', section: 'Calculator', id: 0 },
        { name: 'Chemistry', imgName: 'Chemistry', section: 'Calculator', id: 1 },
        { name: 'Graphing', imgName: 'Graphing', section: 'Calculator', id: 2 },
        { name: 'Programmer', imgName: 'Programmer', section: 'Calculator', id: 3 },
        { name: 'Date Calculation', imgName: 'Date', section: 'Calculator', id: 4 },
      ],
    },
    {
      name: 'Converter',
      id: 1,
      calcList: [
        { name: 'Currency', imgName: 'Currency', section: 'Converter', id: 5 }
      ],
    }
  ],
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
const namesArr = ['Standart', 'Chemistry', 'Graphing', 'Programmer', 'Date Calculation', 'Currency'];
let id = Date.now() + Math.round(Math.random() * 100);

const calculationTypesReducer = (state = JSON.parse(localStorage.getItem('state')) || initialState, action) => {
  const currentList = [];

  state.types.forEach((section) => {
    section.calcList.forEach((calc) => {
      currentList.push(calc.name);
    })
  })

  switch (action.type) {
    case SET_CURRENT_TYPE:
      if (!currentList.includes(action.name)) {
        return state;
      }
      return {
        ...state,
        currentId: action.id,
        currentType: action.name,
      }
    case SET_DISABLED:
      const result = {
        ...state.disabledCalcs,
        Calculator: { ...state.disabledCalcs.Calculator },
        Converter: { ...state.disabledCalcs.Converter }
      };
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
      if (action.name === CALC_TYPES.Standart || action.name === CALC_TYPES.Currency) {
        state.currentType = '';
      }
      return {
        ...state,
        types: state.types.map(el => {
          if (action.sectionId === el.id) {
            return {
              ...el,
              calcList: [
                ...el.calcList.filter(item => item.id !== action.id),
              ]
            }
          }
          return el
        })
      }
    case ADD_ITEM:
      if (namesArr.includes(action.name) && !currentList.includes(action.name)) {
        const newItem = {
          name: action.name,
          imgName: action.name,
          section: action.section,
          id: id++,
        }
        return {
          ...state,
          types: state.types.map((section, i) => {
            if (action.sectionId === section.id) {
              return {
                ...section,
                calcList: [...state.types[i].calcList, newItem],
              }
            }
            return section
          })
        }
      }

      return state;
    case ADD_SECTION:
      const newSection = {
        name: action.name,
        id: id++,
        calcList: [],
      }
      return {
        ...state,
        types: [...state.types, newSection],
      }
    case DELETE_SECTION:
      return {
        ...state,
        types: [...state.types.filter((section) => section.id !== action.id)]
      }
    case MOVE_ITEM:
      if (state.types[action.sectionIndexEnd].length === 0) {
        state.types[action.sectionIndexEnd].push(action.currentItem);
      }
      if (action.sectionIndexStart === action.sectionIndexEnd) {
        const section = state.types[action.sectionIndexStart].calcList;
        const editSection = section.splice(action.currentIndex, 1);
        section.splice(action.dropIndex, 0, ...editSection);
      }

      if (action.sectionIndexStart !== action.sectionIndexEnd) {
        const sectionStart = state.types[action.sectionIndexStart].calcList;
        const editSection = sectionStart.splice(action.currentIndex, 1);
        const sectionEnd = state.types[action.sectionIndexEnd].calcList;
        sectionEnd.splice(action.dropIndex, 0, ...editSection)
      }

      return state;
    case MOVE_SECTION:
      const editTypes = state.types.splice(action.sectionIndexStart, 1);
      state.types.splice(action.dropIndex, 0, ...editTypes);

      return state;
    case SET_NAME_SECTION:
      return {
        ...state,
        types: state.types.map((type) => {
          if (type.id === action.sectionId) {
            type.name = action.name;
          }
          return type;
        })
      }
    case SET_ICON:
      return {
        ...state,
        types: state.types.map((section) => {
          section.calcList.map((calc) => {
            if (calc.id === action.id) {
              calc.imgName = action.imgName
            }
            return calc;
          })
          return section;
        })
      }
    default:
      return state
  }
};

export const setCurrentTypeCreator = ({ id, name }) => ({ type: SET_CURRENT_TYPE, id, name });
export const setDisabledTypeCreator = ({ name, value }) => ({ type: SET_DISABLED, name, value });
export const setDeleteItemCreator = ({ sectionId, id, name }) => ({ type: DELETE_ITEM, sectionId, id, name });
export const setAddItemCreator = ({ sectionId, name }) => ({ type: ADD_ITEM, sectionId, name });
export const setAddSectionCreator = (name) => ({ type: ADD_SECTION, name });
export const setDeleteSectionCreator = (id) => ({ type: DELETE_SECTION, id });
export const setMoveItemCreator = (
  {
    sectionIndexStart,
    sectionIndexEnd,
    currentItem,
    dropIndex,
    currentIndex
  }) => (
  {
    type: MOVE_ITEM,
    sectionIndexStart,
    sectionIndexEnd,
    currentItem,
    dropIndex,
    currentIndex
  });
export const setMoveSectionCreator = ({ sectionIndexStart, dropIndex }) => ({ type: MOVE_SECTION, sectionIndexStart, dropIndex });
export const setNameSectionCreator = ({ sectionId, name }) => ({ type: SET_NAME_SECTION, sectionId, name });
export const setIconCreator = ({ id, imgName }) => ({ type: SET_ICON, id, imgName });


export default calculationTypesReducer;
