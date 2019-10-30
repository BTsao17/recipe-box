const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 8080;
const path = require('path');

const cors = require('cors');

//data
const cuisines = require('./data/cuisines');
const dishTypes = require('./data/dishTypes');

app.use(cors()); //for development only
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

console.log(cuisines);
console.log(dishTypes)




app.get('/dishTypes', (req, res) => {
  const data = dishTypes.map((dishType) => dishType.dishType);
  res.json(data);
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
