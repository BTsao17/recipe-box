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

//CUISINES actions
export const FETCH_CUISINES_BEGIN = 'FETCH_CUISINES_BEGIN';
export const FETCH_CUISINES_SUCCESS = 'FETCH_CUISINES_SUCCESS';
export const FETCH_CUISINES_FAILURE = 'FETCH_CUISINES_FAILURE';
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


//thunk action - doing the fetching
//thunk - a function that's returned by another function
//in Redux, thunk - an action creator that returns a function instead of a plain action object
export const fetchDishTypes = () => {
  console.log('begins?')
  return (dispatch) => {
    dispatch(fetchDishTypesBegin());
    return axios
      .get('http://localhost:8080/dishTypes')
      .then((response) => {
        console.log(response)
        dispatch(fetchDishTypesSuccess(response.data)); 
        return response.data;
      })
      .catch((error) => dispatch(fetchDishTypesFailure(error)));
  };
};
