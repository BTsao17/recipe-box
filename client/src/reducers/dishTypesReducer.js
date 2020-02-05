import { FETCH_DISHTYPES_BEGIN, FETCH_DISHTYPES_SUCCESS, FETCH_DISHTYPES_FAILURE } from '../actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

function dishTypes(state = initialState, action) {
  //handle actions here with if/else or switch. different action type will change state differently, but does not modify the state argument itself.
  switch (action.type) {
    case FETCH_DISHTYPES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DISHTYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.dishTypes,
      };
    case FETCH_DISHTYPES_FAILURE:
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

export default dishTypes;
