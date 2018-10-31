
const express = require('express');
const  app = express();
const PORT = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

function generateRandomString() {
  let random = '';
  const characterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz0123456789';
  for(var i = 0; i < 6; i++) {
    random += characterList.charAt(Math.floor(Math.random() * characterList.length));
  }
  return random;
}
let urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

app.get('/urls', (request, response) => {
  let templateVar = { urls: urlDatabase };
  response.render('urls_index', templateVar);
});

app.get('/urls/new', (request, response) => {
  response.render('urls_new');
});

app.get('/urls/:id', (request, response) => {
  let templateVar = {
    shortURL: request.params.id,
    longURL: urlDatabase
  };
  response.render('/urls/:id', templateVar);
});

app.post('/urls/urls', (request, response) => {
  urlDatabase[generateRandomString()] = request.body.longURL;
  response.send(urlDatabase);
});

app.get('/u/:shortURL', (request, response) => {
  let longURL = request.params.shortURL;
  console.log(longURL);
  response.redirect(urlDatabase[longURL]);
});

app.post('/urls/:shortURL/delete', (request, response) => {
  delete request.params.shortURL;
  response.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
