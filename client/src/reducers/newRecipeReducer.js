import {
  ADD_INGRED_INPUT,
  ADD_STEP_INPUT,
  ADD_NOTE_INPUT,
  ADD_CHANGE,
  ADD_ARRAY_CHANGE,
  SAVE_NEW_RECIPE_TO_SERVER_BEGIN,
  SAVE_NEW_RECIPE_TO_SERVER_SUCCESS,
  SAVE_NEW_RECIPE_TO_SERVER_FAILURE,
} from '../actions';

const initialState = {
  recipe: {
    title: '',
    cuisine: '',
    dish: '',
    time: [
      {
        prep: '',
        unit: 'minutes',
      },
      {
        cook: '',
        unit: 'minutes',
      },
    ],
    ingredients: [
      //not sure how id will work, since it should be linked to the name,
      //but quantity should be tied to the recipe.
      {
        name: '',
        quantity: '',
        unit: '',
      },
      {
        name: '',
        quantity: '',
        unit: '',
      },
    ],
    procedure: [
      //might need id in the future?
      {
        step: 1,
        description: '',
      },
      {
        step: 2,
        description: '',
      },
    ],
    notes: [
      {
        id: 1, //arbitrary num for now. Might change once DB is set up.
        text: '',
      },
    ],
  },
  //for post req
  loading: false,
  error: null,
};

//may need to separate reducers
//future consideration: use immutability-helper or Immer
function newRecipe(state = initialState, action) {
  switch (action.type) {
    case ADD_INGRED_INPUT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: [ ...state.recipe.ingredients, action.payload ],
        },
      };
    case ADD_STEP_INPUT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          procedure: [ ...state.recipe.procedure, action.payload ],
        },
      };
    case ADD_NOTE_INPUT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          notes: [ ...state.recipe.notes, action.payload ],
        },
      };
    case ADD_CHANGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.inputName]: action.inputValue,
        },
      };
    //is there a better way to track changes rather than by character
    case ADD_ARRAY_CHANGE:
      const { inputType, inputIndex, inputName, inputValue } = action;
      //map through the part of the state  to find the key and change the value
      const infoUpdate = { ...state }.recipe[inputType].map((item, i) => {
        const keys = Object.keys(item);
        if (i === parseInt(inputIndex) && keys.includes(inputName)) {
          return {
            ...item,
            [inputName]: inputValue,
          };
        }
        return item;
      });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.inputType]: infoUpdate,
        },
      };
    case SAVE_NEW_RECIPE_TO_SERVER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SAVE_NEW_RECIPE_TO_SERVER_SUCCESS:
      return {
        ...state,
        recipe: {...initialState.recipe}, //immer or immutability helper? - requires deep copy
        loading: false,
      };
    case SAVE_NEW_RECIPE_TO_SERVER_FAILURE:
      return {
        ...state,
        recipe: {...initialState.recipe},
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default newRecipe;
