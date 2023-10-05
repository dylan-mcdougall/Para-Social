import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { restoreCSRF, csrfFetch } from './csrf';

const rootReducer = combineReducers({
  
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export const store = configureStore({ 
  reducer: rootReducer,
  enhancer,
  middleware: [logger]
 });
 
