import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import { restoreCSRF, csrfFetch } from './csrf';

const rootReducer = combineReducers({
  session: sessionReducer,
});

let enhancer = applyMiddleware(thunk);

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger');
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export const store = configureStore({ 
  reducer: rootReducer,
  enhancer,
 });
 
