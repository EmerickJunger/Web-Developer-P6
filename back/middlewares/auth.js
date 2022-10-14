/*const jwt = require('jsonwebtoken');
require('dotenv').config();
 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        // on se débarrasse du BEARED
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User Id non valable !';
        } else {
            next(); 
        }
    }
    catch {
        res.status(401).json({ error: error | 'Utilisateur non authentifié !' })
    }
};/*/