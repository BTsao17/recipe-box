const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 8080;
const path = require('path');

app.use(bodyParser.json());






app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
