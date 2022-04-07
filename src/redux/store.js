import { combineReducers, createStore } from "redux";
import complianceCheck from "../helpers/complianceCheck";

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

store.subscribe(() => {
  localStorage['state'] = JSON.stringify(store.getState().calculatorsType);
});

if (!complianceCheck(JSON.parse(localStorage.state), store.getState().calculatorsType)) {
  localStorage.clear();
}

window.store = store;

export default store;
