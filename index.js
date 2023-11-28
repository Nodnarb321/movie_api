const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'),
{flags: 'a'})



app.use(morgan('combined', {stream: accessLogStream}));

let topMovies = [
    {
        title: 'The Shining'
    },
    {
        title: 'Pet Semetary'
    },
    {
        title: 'A Nightmare on Elm Street'
    },
    {
        title: 'Friday the 13th'
    },
    {
        title: 'Halloween'
    },
    {
        title: 'Nosferatu'
    },
    {
        title: 'The Texas Chainsaw Massacre'
    },
    {
        title: 'Scream'
    },
    {
        title: 'The Grudge'
    },
    {
        title: 'Children of the Corn'
    }
  ];
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to my movie collection!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });