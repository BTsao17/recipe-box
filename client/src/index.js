import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//actions for dishTypes
import {
  FETCH_DISHTYPES_BEGIN,
  FETCH_DISHTYPES_SUCCESS,
  FETCH_DISHTYPES_FAILURE,
  FETCH_CUISINES_BEGIN,
  FETCH_CUISINES_SUCCESS,
  FETCH_CUISINES_FAILURE,
} from './actions';

//set initial state
const initialState = {
  dishTypes: [ 'Appetizer', 'Main', 'Dessert' ],
  cuisines: [ 'Chinese', 'Japanese', 'Korean' ],
  error: null,
};

//reducers - take current state and action, and return a new state.  reduce a set of actions over time into a single state.  should also return the initial state, the first time it's called.
function reducer(state = initialState, action) {
  console.log('reducer', state, action);
  //handle actions here with if/else or switch. different action type will change state differently, but does not modify the state argument itself.
  switch (action.type) {
    case FETCH_DISHTYPES_BEGIN:
      return {
        ...state,
      };
    case FETCH_DISHTYPES_SUCCESS:
      return {
        ...state,
        dishTypes: action.payload.dishTypes,
      };
    case FETCH_DISHTYPES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        dishTypes: [],
      };
    case FETCH_CUISINES_BEGIN:
      return {
        ...state,
      };
    case FETCH_CUISINES_SUCCESS:
      return {
        ...state,
        cuisines: action.payload.cuisines,
      };
    case FETCH_CUISINES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        cuisines: [],
      };
    default:
      return state;
  }
}

//CURRENTLY NOT USING. Combined reducers -> works differently than I thought.  creates objects? Need to read up more before using.
//const rootReducer = combineReducers({ dishTypes: dishTypesReducer, cuisines: cuisinesReducer });

//create a store with reducer
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
