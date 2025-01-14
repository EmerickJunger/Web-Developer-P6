const jwt = require('jsonwebtoken');
//require('dotenv').config();
 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, "Token_Secret"); 
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User Id non valable !';
        } else {
            next(); 
        }
    }
    catch {
        res.status(401).json({ error: 'Utilisateur non authentifié !' })
    }
};