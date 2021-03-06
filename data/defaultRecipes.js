const recipes = [
  {
    id: 1,
    title: 'Apple Pie',
    cuisine: 'American',
    dish: 'dessert',
    time: [
      {
        prep: '15',
        unit: 'minutes',
      },
      {
        cook: '30',
        unit: 'minutes',
      },
    ],
    ingredients: [
      {
        name: 'apples',
        quantity: '5',
        unit: '',
      },
      {
        name: 'flour',
        quantity: '3',
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
    notes: [
      {
        id: 1,
        text: '',
      },
    ],
  },
  {
    id: 2,
    title: 'Mapo Tofu',
    cuisine: 'Chinese',
    dish: 'vegetables',
    time: [
      {
        prep: '',
        unit: 'minutes',
      },
      {
        cook: '30',
        unit: 'minutes',
      },
    ],
    ingredients: [
      {
        name: 'medium-firm tofu',
        quantity: '1',
        unit: 'box',
      },
      {
        name: 'soy sauce',
        quantity: '2',
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
    notes: [
      {
        id: 1,
        text: "I have no idea what I'm doing.",
      },
    ],
  },
];

module.exports = recipes;
