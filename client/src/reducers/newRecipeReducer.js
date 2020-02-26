import { ADD_INGRED_INPUT, ADD_STEP_INPUT, ADD_NOTE_INPUT, ADD_CHANGE, ADD_ARRAY_CHANGE } from '../actions';

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
//future consideration: use immutability-helper or Immer
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
        [action.inputName]: action.inputValue,
      };
    //is there a better way to track changes rather than by character
    case ADD_ARRAY_CHANGE:
      const { inputType, inputIndex, inputName, inputValue } = action;
      //map through the part of the state  to find the key and change the value
      const infoUpdate = { ...state }[inputType].map((item, i) => {
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
        [action.inputType]: infoUpdate,
      };
    default:
      return state;
  }
}

export default newRecipe;
