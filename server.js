const express = require('express');
const hbs = require('hbs');
const dateFormat = require('dateformat');
const fs = require('fs');

var app = express();
var now = new Date();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var log = `${dateFormat(now)}: ${req.method} ${req.originalUrl}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to sever.log.')
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

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