import complianceCheck from "../helpers/complianceCheck";
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
const SET_CURRENT_ICON = 'SET_CURRENT_ICON';
const SET_IS_MOVING = 'SET_IS_MOVING';

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
  disabledCalcs: [
    { name: 'Standart', isDisabled: false },
    { name: 'Scientific', isDisabled: false },
    { name: 'Graphing', isDisabled: false },
    { name: 'Programmer', isDisabled: false },
    { name: 'Date Calculation', isDisabled: false },
    { name: 'Currency', isDisabled: false },
  ],
  currentImgName: '',
  isMoving: false,
};
const namesArr = ['Standart', 'Chemistry', 'Graphing', 'Programmer', 'Date Calculation', 'Currency'];
let id = Date.now() + Math.round(Math.random() * 100);

if (!complianceCheck(JSON.parse(localStorage.state), initialState)) {
  localStorage.clear();
  window.location.reload();
}

const calculationTypesReducer = (state = JSON.parse(localStorage.getItem('state')) || initialState, action) => {
  const currentList = [];

  state.types.forEach((section) => {
    section.calcList.forEach((calc) => {
      currentList.push(calc.name);
    })
  })

  switch (action.type) {
    case SET_CURRENT_TYPE:
      let alternateId;
      let availableNames = [];
      let alternateName;

      state.disabledCalcs.forEach((calc) => {
        if (!calc.isDisabled) {
          availableNames.push(calc.name);
          alternateName = currentList.includes(calc.name) ? calc.name : CALC_TYPES.Standart;
        }
      });

      if (!action.id) {
        state.types.forEach((section) => section.calcList.forEach((calc) => {
          if (action.name === calc.name) {
            alternateId = calc.id;
            return;
          }
          if (!id && alternateName === calc.name) {
            alternateId = calc.id;
            return;
          }
        }))
      }


      if (!currentList.includes(action.name)) {
        return state;
      }
      return {
        ...state,
        currentId: action.id || alternateId,
        currentType: availableNames.includes(action.name) ? action.name : alternateName,
      }
    case SET_DISABLED:
      const result = [...state.disabledCalcs];

      state.disabledCalcs.map((calc, i) => {
        if (calc.name === action.name) {
          result[i].isDisabled = action.value;
        }
      })

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
      if (namesArr.includes(action.name)) {
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
      if (action.droppableIdStart === action.droppableIdEnd) {
        const section = state.types.find(
          (section) => section.id === Number(action.droppableIdEnd)
        ).calcList;
        const editSection = section.splice(action.indexStart, 1);
        section.splice(action.indexDrop, 0, ...editSection);
      }

      if (action.droppableIdStart !== action.droppableIdEnd) {
        const section = state.types.find(
          (section) => section.id === Number(action.droppableIdStart)
        ).calcList;
        const editSection = section.splice(action.indexStart, 1);
        const otherSection = state.types.find(
          (section) => section.id === Number(action.droppableIdEnd)
        ).calcList;
        otherSection.splice(action.indexDrop, 0, ...editSection);
      }

      return state;
    case MOVE_SECTION:
      state.isMoving = true;
      const editTypes = state.types.splice(action.indexStart, 1);
      state.types.splice(action.indexDrop, 0, ...editTypes);
      state.isMoving = false;
      return state;
    case SET_IS_MOVING:
      return {
        ...state,
        isMoving: action.boolean,
      }
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
    case SET_CURRENT_ICON:
      return {
        ...state,
        currentImgName: action.name,
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
        }),
        currentImgName: action.imgName,
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
    droppableIdStart,
    droppableIdEnd,
    indexStart,
    indexDrop,
  }) => ({
    type: MOVE_ITEM,
    droppableIdStart,
    droppableIdEnd,
    indexStart,
    indexDrop,
  });
export const setMoveSectionCreator = ({ indexStart, indexDrop }) => ({ type: MOVE_SECTION, indexStart, indexDrop });
export const setNameSectionCreator = ({ sectionId, name }) => ({ type: SET_NAME_SECTION, sectionId, name });
export const setIconCreator = ({ id, imgName }) => ({ type: SET_ICON, id, imgName });
export const setCurrentIconCreator = (name) => ({ type: SET_CURRENT_ICON, name });
export const setIsMovingCreator = (boolean) => ({ type: SET_IS_MOVING, boolean });

export default calculationTypesReducer;
