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
    //not sure how id will work, or if it's needed.
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

  return state;
}

export default newRecipe;
