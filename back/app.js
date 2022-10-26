const express = require('express');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauceRoute');
const usersRoutes = require('./routes/userRoute');
const bodyParser = require('body-parser');
const path = require('path');
/*const multer = require('../middlewares/multer');*/

const app = express();

mongoose.connect('mongodb+srv://Emerick:poulet@sauces.wjqv84t.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/images',function(req,res){
    const newImage = new Image();
    newImage.img.data = fs.readFileSync(req.files.userPhoto.path)
    newImage.img.contentType = 'image/jpg';
    newImage.save();
    });

/*app.use(multer({ dest: './uploads/',
rename: function (fieldname, filename) {
return filename;
},
}));*/

module.exports = app;