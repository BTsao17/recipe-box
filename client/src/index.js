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
import { FETCH_DISHTYPES_BEGIN, FETCH_DISHTYPES_SUCCESS, FETCH_DISHTYPES_FAILURE } from './actions';

//set initial state
const initialState = {
  dishTypes: [],
  cuisines: [ 'Chinese', 'Japanese', 'Korean' ],
  error: null,
};

//reducers - take current state and action, and return a new state.  reduce a set of actions over time into a single state.  should also return the initial state, the first time it's called.
function dishTypesReducer(state = initialState, action) {
  console.log('dishtype reducer', state, action);
  //handle actions here with if/else or switch. different action type will change state differently, but does not modify the state argument itself.
  switch (action.type) {
    case FETCH_DISHTYPES_BEGIN:
      return {
        ...state,
        error: null,
      };
    case FETCH_DISHTYPES_SUCCESS:
      console.log(action)
      console.log(state)
      return {
        ...state,
        dishTypes: action.payload.dishTypes,
      };
    case FETCH_DISHTYPES_FAILURE:
      console.log(action)
      console.log(state)
      return {
        ...state,
        error: action.payload.error,
        dishTypes: [],
      };
    default:
      return state;
  }
}

//CURRENTLY NOT USING 
function cuisinesReducer(state = initialState, action) {
  console.log('cuisine reducer', state, action);
  return state;
}

//CURRENTLY NOT USING. Combined reducers -> works differently than I thought.  creates objects? Need to read up more before using. 
const rootReducer = combineReducers({ dishTypes: dishTypesReducer, cuisines: cuisinesReducer });

//create a store with reducer
const store = createStore(dishTypesReducer, applyMiddleware(thunk));
console.log(store.getState())

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
