import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import allreducers from "./Reducers/ReducerCombiner";
import { createStore, applyMiddleware } from "redux";

const middleware = [thunk];
const store = createStore(
  allreducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
