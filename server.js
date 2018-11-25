const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'Rodrigo',
    last_name: 'Morgado',
    hobbies: ['trail running', 'programming', 'family'],
    age: 34
  });
});

app.get('/about', (req, res) => {
  res.send('About this page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Everything falling'
  })
});

app.listen(3000, () =>{
  console.log('Server is working in port 3000');
});