import { FETCH_LIST_BEGIN, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from '../actions';

//dummy data
import { GET_RECIPE_BY_TYPE } from '../actions';

const initialState = {
  items: [
    { title: 'Apple Pie', id: 0, type: 'dessert' },
    { title: 'Tiramisu', id: 1, type: 'dessert' },
    { title: 'Corn Chowder', id: 2, type: 'soups' },
  ],
  loading: false,
  error: null,
   //dummy data filter.
   itemsByType: [],
};

function recipeList(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.recipeList,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
      
    //for dummy data.
    case GET_RECIPE_BY_TYPE:
      //given the type from the url, filter the items.
      const recipeListByType = state.items.filter(item => item.type === action.payload)
      console.log('recipebytype', recipeListByType)
      return {
        ...state,
        itemsByType: recipeListByType,
      };
    default:
      return state;
  }
}

export default recipeList;
