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

console.log(recipes[0]);



app.get('/dishTypes', (req, res) => {
  const data = dishTypes.map((dishType) => dishType.dishType);
  res.json(data);
});

app.get('/cuisines', (req, res) => {
  const data = cuisines.map((cuisine) => cuisine.cuisine);
  res.json(data);
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
