const User = require("../models/user");
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { request } = require('http');

//require('dotenv').config();

exports.signup = (req, res, next) => {
    const emailReg = new RegExp(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/);
    const validEmail = emailReg.test(req.body.email);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    const validMdp = mdpReg.test(req.body.password);
    if(validEmail && validMdp) {
        bcrypt.hash(req.body.password, 10) 
        .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash 
        });
        user.save() 
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        throw 'Email non valide !';
    }
    
};

exports.login = (req, res, next) => {
    const emailReg = new RegExp(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/);
    const validEmail = emailReg.test(req.body.email);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    const validMdp = mdpReg.test(req.body.password);
    if(validEmail && validMdp) {
        User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) { 
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({ 
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id }, 
                        process.env.TOKEN, 
                        { expiresIn: '6 hours' } 
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        throw 'Email ou mot de passe non valide !';
    }
};