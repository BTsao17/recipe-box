import { ADD_INGREDS_INPUT } from '../actions';

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

function newRecipe(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDS_INPUT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}

export default newRecipe;
