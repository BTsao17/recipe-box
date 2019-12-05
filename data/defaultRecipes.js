const recipes = [
  {
    id: 1,
    title: 'Apple Pie',
    cuisine: 'American',
    dish: 'dessert',
    time: {
      prep: 10,
      cook: 25,
      unit: 'minutes',
    },
    ingredients: [
      {
        name: 'apples',
        quantity: 5,
        unit: '',
      },
      {
        name: 'flour',
        quantity: 3,
        unit: 'tablespoon',
      },
    ],
    procedure: [
      {
        step: 1,
        description: 'blahblahblah',
        // image: {
        //   url: '',
        //   description: '',
        // },
      },
      {
        step: 2,
        description: 'more of this and that',
        // image: {
        //   url: '',
        //   description: '',
        // },
      },
    ],
    notes: [],
  },
  {
    id: 2,
    title: 'Mapor Tofu',
    cuisine: 'Chinese',
    dish: 'main',
    time: {
      prep: 10,
      cook: 25,
      unit: 'minutes',
    },
    ingredients: [
      {
        name: 'medium-firm tofu',
        quantity: 1,
        unit: 'box',
      },
      {
        name: 'soy sauce',
        quantity: 2,
        unit: 'tablespoon',
      },
    ],
    procedure: [
      {
        step: 1,
        description: 'blahblahblah',
        // image: {
        //   url: '',
        //   description: '',
        // },
      },
      {
        step: 2,
        description: 'more of this and that',
        // image: {
        //   url: '',
        //   description: '',
        // },
      },
    ],
    notes: [],
  },
];

module.exports = recipes;
