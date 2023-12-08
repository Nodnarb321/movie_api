const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "John",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jane",
        favoriteMovies: ["The Shining"]
    }
]

let movies = [
    {
        'Title': 'The Shining',
        'Description': 'Nicholson plays Jack Torrance, a writer and recovering alcoholic who accepts a new position as the off-season caretaker of the Overlook Hotel.',
        'Director': {
            'Name': 'Stanley Kubrick',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Pet Semetary',
        'Description': '',
        'Director': {
            'Name': 'Kevin Kolsch, Dennis Widmyer',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'A Nightmare on Elm Street',
        'Description': '',
        'Director': {
            'Name': 'Jack Sholder, Charles Russel, Rachel Talalay, Wes Craven, Renny Harlin, Stephen Hopkins',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Friday the 13th',
        'Description': '',
        'Director': {
            'Name': 'Tom McLoughlin, Joseph Zito, Marcus Nispel',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Halloween',
        'Description': '',
        'Director': {
            'Name': 'Rob Zombie, John Carpenter, David Gordon',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Nosferatu',
        'Description': '',
        'Director': {
            'Name': 'F.W. Murnau',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'The Texas Chainsaw Massacre',
        'Description': '',
        'Director': {
            'Name': 'Tobe Hooper',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Scream',
        'Description': '',
        'Director': {
            'Name': 'Wes Craven, Tyler Gillett, Matt Bettinelli-Olpin',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'The Grudge',
        'Description': '',
        'Director': {
            'Name': 'Takashi Shimizu',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    },
    {
        'Title': 'Children of the Corn',
        'Description': '',
        'Director': {
            'Name': 'Kurt Wimmer, Fritz Kiersch, Joel Soisson, Ethan Wiley',
            'Bio': '',
            'Birth': ''
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': '',
        //'featured':
    }
];

//READ
app.get('/', (req, res) => {
    res.status(200).json('Welcome to my Movie API!')
})

//READ
app.get('/documentation', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/documentation.html'));
});

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names')
    }
})

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User not found')
    }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(201).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('User not found')
    }
})

//DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('User not found')
    }
})

//DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id )
        res.status(200).send(`User ${id} has been deleted`);
    } else {
        res.status(400).send('User not found')
    }
})


//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }
})

//READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such Genre');
    }
})

//READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such Director');
    }
})

//

app.listen(8080, () => console.log('listening on 8080')) 

