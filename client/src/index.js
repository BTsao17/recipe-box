import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//set initial state
const initialState = {
  dishTypes: [ 'Appetizer', 'Main', 'Vegetables', 'Dessert' ],
  cuisines: [ 'Chinese', 'Japanese', 'Korean' ],
};

//reducers - take current state and action, and return a new state.  reduce a set of actions over time into a single state.  should also return the initial state, the first time it's called.
function dishTypesReducer(state = initialState.dishTypes, action) {
  console.log('reducer', state, action);
  //handle actions here with if/else or switch. different action type will change state differently, but does not modify the state argument itself.
  return state;
}
function cuisinesReducer(state = initialState.cuisines, action) {
  console.log('reducer', state, action);
  return state;
}
//combined reducers
const rootReducer = combineReducers({ dishTypes: dishTypesReducer, cuisines: cuisinesReducer });

//create a store with reducer
const store = createStore(rootReducer, applyMiddleware(thunk));

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
