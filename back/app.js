const express = require('express');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauceRoute');
/*const usersRoutes = require('./routes/userRoute');*/

const app = express();

mongoose.connect('mongodb://localhost:27017/piiquante')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', saucesRoutes);
/*app.use('/api/auth', usersRoutes);*/

//app.use(bodyParser.json());

//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;