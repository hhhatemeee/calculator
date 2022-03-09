import { combineReducers, createStore } from "redux";
import buttonsReducer from "./buttonsReducer";
import caclculationsReducer from "./calculationsReducer";
import themeReducer from './themeReducer';

let reducers = combineReducers({
  themeSelector: themeReducer,
  calculations: caclculationsReducer,
  buttonList: buttonsReducer,
});

let store = createStore(reducers);

export default store;