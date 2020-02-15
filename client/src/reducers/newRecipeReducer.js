import { ADD_INGRED_INPUT, ADD_STEP_INPUT, ADD_NOTE_INPUT, ADD_CHANGE } from '../actions';

const initialState = {
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
};

//may need to separate reducers
function newRecipe(state = initialState, action) {
  switch (action.type) {
    case ADD_INGRED_INPUT:
      return {
        ...state,
        ingredients: [ ...state.ingredients, action.payload ],
      };
    case ADD_STEP_INPUT:
      return {
        ...state,
        procedure: [ ...state.procedure, action.payload ],
      };
    case ADD_NOTE_INPUT:
      return {
        ...state,
        notes: [ ...state.notes, action.payload ],
      };
    case ADD_CHANGE:
      return {
        ...state,
        [action.inputName]: action.inputValue
      }
    default:
      return state;
  }
}

export default newRecipe;
