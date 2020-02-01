import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

//actions for fetching data - only needed if you want to dispatch here.
import { fetchDishTypes, fetchCuisines } from './actions';

//redux dev tools extension in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create a store with reducer
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
//log initial state
console.log('initial state', store.getState());
// store.dispatch(fetchDishTypes());
// store.dispatch(fetchCuisines());

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
