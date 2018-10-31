
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
// brings me to delete/ edit page with list of databse
app.get('/urls', (request, response) => {
  let templateVar = { urls: urlDatabase };
  response.render('urls_index', templateVar);
});
// main page to put in a long url
app.get('/urls/new', (request, response) => {
  response.render('urls_new');
});
//brings to edit page for specific short url
app.get('/urls/:id', (request, response) => {
  let id = request.params.id;
  let templateVar = { urls: urlDatabase };
  response.render('urls_show', templateVar);
});

// app.post('/urls/urls', (request, response) => {
//   urlDatabase[generateRandomString()] = request.body.longURL;
//   response.send(urlDatabase);
// });

app.post('/urls/:id/delete', (request, response) => {
  const id = request.params.id;
  delete urlDatabase[id];
  response.redirect('/urls');
});
app.post('/urls/:id/updateRequest', (request, response) => {
  const id =  request.params.id;
  let templateVar = { shortURL: id};
  response.render('urls_show', templateVar);
});

app.post('/urls/:id/update', (request, response) => {
  let id = request.params.id;
  urlDatabase[id] = request.body.longURL;
  response.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

