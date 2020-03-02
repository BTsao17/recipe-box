import axios from 'axios';

//DISHTYPES actions
//action constants
export const FETCH_DISHTYPES_BEGIN = 'FETCH_DISHTYPES_BEGIN';
export const FETCH_DISHTYPES_SUCCESS = 'FETCH_DISHTYPES_SUCCESS';
export const FETCH_DISHTYPES_FAILURE = 'FETCH_DISHTYPES_FAILURE';
//Redux action creators
const fetchDishTypesBegin = () => ({
  type: FETCH_DISHTYPES_BEGIN,
});
const fetchDishTypesSuccess = (dishTypes) => ({
  type: FETCH_DISHTYPES_SUCCESS,
  payload: { dishTypes },
});
const fetchDishTypesFailure = (error) => ({
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
const fetchCuisinesBegin = () => ({
  type: FETCH_CUISINES_BEGIN,
});
const fetchCuisinesSuccess = (cuisines) => ({
  type: FETCH_CUISINES_SUCCESS,
  payload: { cuisines },
});
const fetchCuisinesFailure = (error) => ({
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

//Recipe Details  actions
//constants
export const FETCH_DETS_BEGIN = 'FETCH_DETS_BEGIN';
export const FETCH_DETS_SUCCESS = 'FETCH_DETS_SUCCESS';
export const FETCH_DETS_FAILURE = 'FETCH_DETS_FAILURE';
//creators
const fetchDetsBegin = () => ({ type: FETCH_DETS_BEGIN });
const fetchDetsSuccess = (recipeDetails) => ({
  type: FETCH_DETS_SUCCESS,
  payload: { recipeDetails },
});
const fetchDetsFailure = (error) => ({
  type: FETCH_DETS_FAILURE,
  payload: { error },
});

export const fetchRecipeDetails = (type, id, title) => {
  console.log(type, id, title);
  return (dispatch) => {
    dispatch(fetchDetsBegin());
    return axios
      .get(`http://localhost:8080/recipe/${type}/${id}/${title}`)
      .then((response) => {
        console.log('dets', response.data);
        dispatch(fetchDetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => dispatch(fetchDetsFailure(error)));
  };
};

//Recipe Form Actions
export const ADD_INGRED_INPUT = 'ADD_INGRED_INPUT';
export const ADD_STEP_INPUT = 'ADD_STEP_INPUT';
export const ADD_NOTE_INPUT = 'ADD_NOTE_INPUT';
export const ADD_CHANGE = 'ADD_CHANGE';
export const ADD_ARRAY_CHANGE = 'ADD_ARRAY_CHANGE';
//for POST req.
export const SAVE_NEW_RECIPE_TO_SERVER_BEGIN = 'SAVE_NEW_RECIPE_TO_SERVER_BEGIN';
export const SAVE_NEW_RECIPE_TO_SERVER_SUCCESS = 'SAVE_NEW_RECIPE_TO_SERVER_SUCCESS';
export const SAVE_NEW_RECIPE_TO_SERVER_FAILURE = 'SAVE_NEW_RECIPE_TO_SERVER_FAILURE';

export const addIngredInput = (template) => ({
  type: ADD_INGRED_INPUT,
  payload: template,
});
export const addStepInput = (template) => ({
  type: ADD_STEP_INPUT,
  payload: template,
});
export const addNoteInput = (template) => ({
  type: ADD_NOTE_INPUT,
  payload: template,
});

//consider using payload: {inputName, inputValue} ?
export const addChange = (inputName, inputValue) => ({
  type: ADD_CHANGE,
  inputName,
  inputValue,
});
export const addArrayChange = (inputType, inputIndex, inputName, inputValue) => ({
  type: ADD_ARRAY_CHANGE,
  inputName,
  inputValue,
  inputType,
  inputIndex,
});

const postNewRecipeBegin = () => ({ type: SAVE_NEW_RECIPE_TO_SERVER_BEGIN });
const postNewRecipeSuccess = (newRecipeInfo) => ({
  type: SAVE_NEW_RECIPE_TO_SERVER_SUCCESS,
  payload: { newRecipeInfo },
});
const postNewRecipeFailure = (error) => ({
  type: SAVE_NEW_RECIPE_TO_SERVER_FAILURE,
  payload: { error },
});

export const saveRecipe = (newRecipeState, history) => {
  console.log('newRecipeState', newRecipeState);
  const data = { ...newRecipeState }; //will need immutability helper for deep copy.
  data.id = Math.floor(Math.random() * 1000); //generate random id

  //make sure all cuisine and dish data are in the correct case.
  data.dish = data.dish.toLowerCase(); //all lowercase
  data.cuisine = data.cuisine.charAt(0).toUpperCase() + data.cuisine.slice(1); //first letter is uppercase

  return (dispatch) => {
    dispatch(postNewRecipeBegin());
    return axios
      .post(`http://localhost:8080/recipe`, data)
      .then((response) => {
        console.log('new recipe dets', response.data);
        dispatch(postNewRecipeSuccess(response.data));

        //to redirect to details page - set up
        let { title, id, dish } = response.data;
        //change first letter of dish to capital
        dish = dish.charAt(0).toUpperCase() + dish.slice(1);
        //change title to lower case with dash, if more than one word
        title = title.toLowerCase().split(' ').join('-');
        history.push(`${dish}/${id}/${title}`);
        return response.data;
      })
      .catch((error) => dispatch(postNewRecipeFailure(error)));
  };
};
