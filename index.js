const express = require('express'),
    app = express(),
    path = require('path'),
    uuid = require('uuid');

    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const { check, validationResult } = require('express-validator');

const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlix', {useNewUrlParser: true, useUnifiedTopology: true });


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
            'Bio': 'Stanley Kubrick was an American film director, producer, screenwriter and photographer.',
            'Birth': '1928'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'theshining.png',
        'featured': true
    },
    {
        'Title': 'Pet Semetary',
        'Description': ' After tragedy strikes, a grieving father discovers an ancient burial ground behind his home with the power to raise the dead.',
        'Director': {
            'Name': 'Mary Lambert',
            'Bio': 'Mary Lambert Gary is an American director. She has directed music videos, television episodes and feature films, mainly in the horror genre.',
            'Birth': '1951'
        },
        'Genre': {
            'name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'petsemetary.png',
        'featured': true
    },
    {
        'Title': 'A Nightmare on Elm Street',
        'Description': 'Teenager Nancy Thompson must uncover the dark truth concealed by her parents after she and her friends become targets of the spirit of a serial killer with a bladed glove in their dreams, in which if they die, it kills them in real life.',
        'Director': {
            'Name': 'Wes Craven',
            'Bio': 'Wesley Earl Craven was an American film director, screenwriter, producer, actor, and editor. Craven has commonly been recognized as one of the greatest masters of the horror genre due to the cultural impact and influence of his work.',
            'Birth': '1939'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'nightmareonelmstreet.png',
        'featured': true
    },
    {
        'Title': 'Friday the 13th',
        'Description': 'A group of camp counselors trying to reopen a summer camp called Crystal Lake, which has a grim past, are stalked by a mysterious killer.',
        'Director': {
            'Name': 'Sean S. Cunningham',
            'Bio': 'Sean Sexton Cunningham is an American filmmaker, director, producer, and writer. He is best known for directing and producing several horror films, beginning in the early 1970s.',
            'Birth': '1941'
        },
        'Genre': {
            'name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'fridaythe13th.png',
        'featured': true
    },
    {
        'Title': 'Halloween',
        'Description': 'Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois to kill again.',
        'Director': {
            'Name': 'John Carpenter',
            'Bio': 'John Howard Carpenter is an American film maker and composer. Most commonly associated with horror, action, and science fiction films of the 1970s and 1980s, he is generally recognized as one of the greatest masters of the horror genre.',
            'Birth': '1948'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'halloween.png',
        'featured': true
    },
    {
        'Title': 'Nosferatu',
        'Description': ' Count Orlok is a vampire living in the mountains of Transylvania and is commonly known as "The Bird of Death". He lives alone in a vast castle among the crevices of the Carpathian Mountains of Romania.',
        'Director': {
            'Name': 'F.W. Murnau',
            'Bio': 'Friedrich Wilhelm Murnau was a German film director, producer and screenwriter. He is regarded as one of cinema\'s most influential filmmakers for his work in the silent era.',
            'Birth': '1888'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'nosferatu.png',
        'featured': true
    },
    {
        'Title': 'The Texas Chainsaw Massacre',
        'Description': 'Five friends head out to rural Texas to visit the grave of a grandfather. On the way they stumble across what appears to be a deserted house, only to discover something sinister within. Something armed with a chainsaw.',
        'Director': {
            'Name': 'Tobe Hooper',
            'Bio': 'Willard Tobe Hooper was an American filmmaker, best known for his work in the horror genre.',
            'Birth': '1943'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'texaschainsaw.png',
        'featured': true
    },
    {
        'Title': 'Scream',
        'Description': 'A year after the murder of her mother, a teenage girl is terrorized by a masked killer who targets her and her friends by using scary movies as part of a deadly game.',
        'Director': {
            'Name': 'Wes Craven',
            'Bio': 'Wesley Earl Craven was an American film director, screenwriter, producer, actor, and editor. Craven has commonly been recognized as one of the greatest masters of the horror genre due to the cultural impact and influence of his work.',
            'Birth': '1939'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'scream.png',
        'featured': true
    },
    {
        'Title': 'The Grudge',
        'Description': 'The Grudge is a curse that is born when someone dies in extreme rage or sorrow and lingers where the person dies. Those who encounter it will die, and the curse is reborn repeatedly, passing from victim to victim in an endless, growing chain of horror.',
        'Director': {
            'Name': 'Takashi Shimizu',
            'Bio': 'Takashi Shimizu is a Japanese filmmaker. He is best known for being the creator of the Ju-On franchise, and directing four of its films, internationally, in both Japan and the U.S.',
            'Birth': '1972'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'grudge.png',
        'featured': true
    },
    {
        'Title': 'Children of the Corn',
        'Description': 'The story is about a couple who end up in an abandoned Nebraska town that is inhabited by a cult of murderous children who worship a demon that lives in the local cornfields.',
        'Director': {
            'Name': 'Fritz Kiersch',
            'Bio': 'George Keith "Fritz" Kiersch is an American film director, writer and, producer.',
            'Birth': '1951'
        },
        'Genre': {
            'Name': 'Horror',
            'Description': 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.'
        },
        'ImageURL': 'childrenofcorn.png',
        'featured': true
    },
    {
        'Title': 'Pokemon: The First Movie',
        'Description': 'Scientists genetically create a new Pokémon, Mewtwo, but the results are horrific and disastrous.',
        'Director': {
            'Name': 'Kunihiko Yuyama',
            'Bio': 'Kunihiko Yuyama is a Japanese director best known for his work on the Pokémon anime franchise.',
            'Birth': '1952'
        },
        'Genre': {
            'Name': 'Animated',
            'Description': 'An animated movie or cartoon, is made up of a series of slightly different drawings of people, animals, and objects that make them appear to move.',
        },
        'ImageURL': 'pokemonfirstmovie.png',
        'featured': true
    },
    {
        'Title': 'The Equalizer',
        'Description': 'Robert McCall (Denzel Washington), a man of mysterious origin who believes he has put the past behind him, dedicates himself to creating a quiet new life. However, when he meets Teri (Chloë Grace Moretz), a teenager who has been manhandled by violent Russian mobsters, he simply cannot walk away.',
        'Director': {
            'Name': 'Antoine Fuqua',
            'Bio': 'Antoine Fuqua is an American film director known for his work in the action and thriller genres.',
            'Birth': '1965'
        },
        'Genre': {
            'Name': 'Action',
            'Description': 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        },
        'ImageURL': 'equalizer.png',
        'featured': true
    }
];

//CREATE LIST

//ADD A USER
app.post('/users',
    [
        check('Username', 'Username is Required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is Required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ], async (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
        .then((users) => {
            if (users) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//ADD A MOVIE TO USER FAVORITE MOVIE LIST
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//CREATE LIST END

//READ LIST

//IF NO END POINTS ARE ADDED
app.get('/', (req, res) => {
    res.status(200).json('Welcome to my Movie API!')
})

//DOCUMENTATION PAGE
app.get('/documentation', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/documentation.html'));
});

//SHOWS A LIST OF ALL USERS
app.get('/users', passport.authenticate('jwt', { session: false }), 
async (req, res) => {
    await Users.find()
        .then((users) =>{
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//SHOWS A USER BY USERNAME
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//SHOWS ALL MOVIES
app.get('/movies', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//SHOWS MOVIE BY TITLE
app.get('/movies/:title', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Movies.findOne({ Title: req.params.title })
        .then((movies) => {
            res.status(201).json(movies)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//SHOWS DESCRIPTION BY GENRE
app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.genreName })
        .then((movie) => {
            res.status(201).json(movie.Genre)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//SHOWS BIO,BIRTHDAY,DEATHDAY BY DIRECTOR
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Movies.findOne({ "Director.Name": req.params.directorName })
        .then((movie) => {
            res.status(201).json(movie.Director)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//READ LIST END

//UPDATE LIST

//UPDATES A USER BY USERNAME
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), 
[
    check('Username', 'Username is Required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is Required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {

let errors = validationResult(req);

if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
}
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
    },
    { new: true }) 
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//UPDATE LIST END

//DELETE LIST

//DELETES A USER BY USERNAME
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//DELETES A MOVIE FROM USERS FAVORITE MOVIE LIST BY TITLE
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

