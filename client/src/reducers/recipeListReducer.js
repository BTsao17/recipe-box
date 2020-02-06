import { FETCH_LIST_BEGIN, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from '../actions';

const initialState = {
  list: [],
  loading: false,
  error: null,
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
        list: action.payload.recipeList,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        list: [],
      };
    default:
      return state;
  }
}

export default recipeList;
