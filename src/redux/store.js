import { combineReducers, createStore } from "redux";

import buttonsReducer from "./buttonsReducer";
import convertationReducer from "./convertationReducer";
import themeReducer from './themeReducer';

let reducers = combineReducers({
  themeSelector: themeReducer,
  buttonList: buttonsReducer,
  convertation: convertationReducer,
});

let store = createStore(reducers);

export default store;