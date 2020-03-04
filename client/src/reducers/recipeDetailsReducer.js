import { FETCH_DETS_BEGIN, FETCH_DETS_SUCCESS, FETCH_DETS_FAILURE } from '../actions';

const initialState = {
  details: {},
  loading: false,
  error: null,
};

function recipeDetails(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DETS_SUCCESS:
      return {
        ...state,
        details: action.payload.recipeDetails,
        loading: false,
        error: null,
      };
    case FETCH_DETS_FAILURE:
      return {
        ...state,
        details: {},
        loading: false,
        error: action.payload.error.response,
      };
    default:
      return state;
  }
}

export default recipeDetails;
