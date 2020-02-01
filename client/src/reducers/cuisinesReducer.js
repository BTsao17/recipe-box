import { FETCH_CUISINES_BEGIN, FETCH_CUISINES_SUCCESS, FETCH_CUISINES_FAILURE } from '../actions';

const initialState = {
  items: ['Chinese', 'Japanese', 'Korean'],
  loading: false,
  error: null,
};

function cuisines(state = initialState, action) {
  switch (action.type) {
    case FETCH_CUISINES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUISINES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.cuisines,
      };
    case FETCH_CUISINES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
}

export default cuisines