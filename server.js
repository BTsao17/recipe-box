const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 8080;
const path = require('path');

//data
const cuisines = require('./data/cuisines');
const dishTypes = require('./data/dishTypes')

app.use(bodyParser.json());

console.log(cuisines);
console.log(dishTypes)





app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
