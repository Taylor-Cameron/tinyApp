
const express = require('express');
const  app = express();
const PORT = 8080;
const bodyParser = require('body-parser');

 app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

app.get('/', (request, response) => {
  response.send('Hello!');
});

app.get('/urls.json', (request, response) => {
  response.json(urlDatabase);
});

app.get('/hello', (request, response) => {
  response.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.get('/urls', (request, response) => {
  let templateVar = { urls: urlDatabase };
  response.render('url_index', templateVar);
});

app.get('/urls/new', (request, response) => {
  response.render('urls_new');
});

app.get('/urls/:id', (request, response) => {
  let templateVar = {
    shortURL: request.params.id,
    longURL: urlDatabase
  };
  response.render('urls_show', templateVar);
});

app.post('/urls/urls', (request, response) => {
  response.send('OK');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});