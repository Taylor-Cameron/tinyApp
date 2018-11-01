
const express = require('express');
const  app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

