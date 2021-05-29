import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { entityReducer, entityFigureReducer } from "./reducers/entityReducers";
import { txnReducer } from "./reducers/txnReducers";
import { configReducer } from "./reducers/configReducer";

const reducer = combineReducers({
  entityState: entityReducer,
  entityFigure: entityFigureReducer,
  txnState: txnReducer,
  config: configReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  entityState: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
