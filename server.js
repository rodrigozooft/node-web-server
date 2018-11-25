const express = require('express');
const hbs = require('hbs');
const dateFormat = require('dateformat');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

var now = new Date();
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My first Website with Node',
    welcomeMessage: 'Welcome to this fantastic web site',
    currentTime: 'The time is ' + dateFormat(now)
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Everything falling'
  })
});

app.listen(3000, () =>{
  console.log('Server is working in port 3000');
});