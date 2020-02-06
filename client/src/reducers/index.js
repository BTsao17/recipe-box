import dishTypes from './dishTypesReducer';
import cuisines from './cuisinesReducer';
import recipeList from './recipeListReducer';
import recipeDetails from './recipeDetailsReducer';

//alt, use combineReducer
import { combineReducers } from 'redux';

// initial state structure
// const initialState = {
//   dishTypes: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   cuisines: {
//     items: [ 'Chinese', 'Japanese', 'Korean' ],
//     loading: false,
//     error: null,
//   },
//   recipeList: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   recipeDetails: {
//     details: {},
//     loading: false,
//     error: null,
//   }
// };

//reducers - take current state and action, and return a new state.
//reduce a set of actions over time into a single state.
//should also return the initial state, the first time it's called.

function rootReducer(state = {}, action) {
  console.log('root reducer', state, action);
  return {
    dishTypes: dishTypes(state.dishTypes, action),
    cuisines: cuisines(state.cuisines, action),
    recipeList: recipeList(state.recipeList, action),
    recipeDetails: recipeDetails(state.recipeDetails, action),
  };
}

// alt:
// const rootReducer = combineReducers({
//   dishTypes,
//   cuisines,
//   recipeList,
//   recipeDetails,
// });

export default rootReducer;
