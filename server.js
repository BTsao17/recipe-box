const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 8080;
const path = require('path');

const cors = require('cors');

//data
const cuisines = require('./data/cuisines');
const dishTypes = require('./data/dishTypes');
const recipes = require('./data/defaultRecipes');

app.use(cors()); //for development only
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get('/dishTypes', (req, res) => {
  const data = dishTypes.map((dishType) => dishType.dishType);
  res.json(data);
});

app.get('/cuisines', (req, res) => {
  const data = cuisines.map((cuisine) => cuisine.cuisine);
  res.json(data);
});

// ***recipeList might be unnecessary for App.js.
app.get('/recipeList', (req, res) => {
  const titleIDs = recipes.reduce((acc, cV) => {
    const recipeTitleID = ((recipe) => ({ title: recipe.title, id: recipe.id, dish: recipe.dish }))(cV);
    acc.push(recipeTitleID);
    return acc;
  }, []);

  /* alt
  const titleIDs = [];
  recipes.forEach((recipe) => {
    const titleID = ((obj) => ({ title: obj.title, id: obj.id }))(recipe);
    titleIDs.push(titleID);
  });
  */

  res.json(titleIDs);
});

//recipeList based on dishType selected
app.get('/:type', (req, res) => {
  const type = req.params.type.toLowerCase();
  const recipeList = recipes.reduce((acc, cV) => {
    if (cV.dish === type) {
      const titleIDType = (({ title, id, dish }) => ({ title, id, dish}))(cV);
      acc.push(titleIDType);
    }
    return acc;
  }, []);

  console.log(recipeList);

  res.json(recipeList);
});

//recipeDetails, given the id
app.get('/recipe/:type/:id/:title', (req, res) => {
  //specific query to allow for easier url validation.
  const recipeID = parseInt(req.params.id);
  const dishType = req.params.type.toLowerCase();
  const recipeTitle = req.params.title.split('-').join(' ').toLowerCase();

  console.log(recipeID, dishType, recipeTitle);

  //query will change once db is set up for sure.
  let recipeDetails = recipes.find(
    (recipe) => recipe.id === recipeID && recipe.dish === dishType && recipe.title.toLowerCase() === recipeTitle
  );

  console.log(recipeDetails);
  
  if (recipeDetails === undefined) {
    recipeDetails = {};
  }

  res.json(recipeDetails);
});

//add new recipe
app.post('/recipe', (req, res) => {
  const newRecipe = req.body;
  //save recipe to array of recipes
  recipes.push(newRecipe);
  console.log(recipes);
  //retrieve  new recipe title, id, and dish to send back (rather than the entire recipe list);
  //anonymous function is evoked immediately
  //without object destructuring: ((recipe) => ({title:recipe.title, id: recipe.id}))(newRecipe)
  const titleID = (({ title, id, dish }) => ({ title, id, dish }))(newRecipe);
  res.json(titleID);
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
