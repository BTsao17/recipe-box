import axios from 'axios';

//DISHTYPES actions
//to fetch data from server
//action constants
export const FETCH_DISHTYPES_BEGIN = 'FETCH_DISHTYPES_BEGIN';
export const FETCH_DISHTYPES_SUCCESS = 'FETCH_DISHTYPES_SUCCESS';
export const FETCH_DISHTYPES_FAILURE = 'FETCH_DISHTYPES_FAILURE';
//Redux action creators
export const fetchDishTypesBegin = () => ({
  type: FETCH_DISHTYPES_BEGIN,
});
export const fetchDishTypesSuccess = (dishTypes) => ({
  type: FETCH_DISHTYPES_SUCCESS,
  payload: { dishTypes },
});
export const fetchDishTypesFailure = (error) => ({
  type: FETCH_DISHTYPES_FAILURE,
  payload: { error },
});
//thunk action - doing the fetching
//thunk - a function that's returned by another function
//in Redux, thunk - an action creator that returns a function instead of a plain action object
export const fetchDishTypes = () => {
  return (dispatch) => {
    dispatch(fetchDishTypesBegin());
    return axios
      .get('http://localhost:8080/dishTypes')
      .then((response) => {
        //console.log(response)
        dispatch(fetchDishTypesSuccess(response.data));
        return response.data;
      })
      .catch((error) => dispatch(fetchDishTypesFailure(error)));
  };
};

//CUISINES actions
//constants
export const FETCH_CUISINES_BEGIN = 'FETCH_CUISINES_BEGIN';
export const FETCH_CUISINES_SUCCESS = 'FETCH_CUISINES_SUCCESS';
export const FETCH_CUISINES_FAILURE = 'FETCH_CUISINES_FAILURE';
//creators
export const fetchCuisinesBegin = () => ({
  type: FETCH_CUISINES_BEGIN,
});
export const fetchCuisinesSuccess = (cuisines) => ({
  type: FETCH_CUISINES_SUCCESS,
  payload: { cuisines },
});
export const fetchCuisinesFailure = (error) => ({
  type: FETCH_CUISINES_FAILURE,
  payload: { error },
});
//thunk
export const fetchCuisines = () => {
  return (dispatch) => {
    dispatch(fetchCuisinesBegin());
    return axios
      .get('http://localhost:8080/cuisines')
      .then((response) => {
        //console.log(response)
        dispatch(fetchCuisinesSuccess(response.data));
        return response.data;
      })
      .catch((error) => dispatch(fetchCuisinesFailure(error)));
  };
};

//RECIPELIST actions
//constants
export const FETCH_LIST_BEGIN = 'FETCH_LIST_BEGIN';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';
//creators
const fetchListBegin = () => ({ type: FETCH_LIST_BEGIN });
const fetchListSuccess = (recipeList) => ({
  type: FETCH_LIST_SUCCESS,
  payload: { recipeList },
});
const fetchListFailure = (error) => ({
  type: FETCH_LIST_FAILURE,
  payload: { error },
});
//thunk
export const fetchRecipeList = (type) => {
  console.log(type);
  return (dispatch) => {
    dispatch(fetchListBegin());
    return axios
      .get(`http://localhost:8080/${type}`)
      .then((response) => {
        console.log(response);
        dispatch(fetchListSuccess(response.data));
        return response.data;
      })
      .catch((error) => dispatch(fetchListFailure(error)));
  };
};