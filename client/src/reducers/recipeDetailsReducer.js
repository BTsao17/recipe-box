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
        loading: false,
        details: action.payload.recipeDetails,
      };
    case FETCH_DETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        details: {},
      };
    default:
      return state;
  }
}

export default recipeDetails;
