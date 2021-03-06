import { combineReducers, createStore } from "redux";

import buttonsReducer from "./buttonsReducer";
import calculationTypesReducer from "./calculationTypesReducer";
import convertationReducer from "./convertationReducer";
import themeReducer from './themeReducer';

let reducers = combineReducers({
  themeSelector: themeReducer,
  buttonList: buttonsReducer,
  convertation: convertationReducer,
  calculatorsType: calculationTypesReducer,
});

let store = createStore(reducers);
window.store = store;

export default store;