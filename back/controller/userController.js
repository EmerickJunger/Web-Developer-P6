const Sauce = require("../models/auth");
const fs = require('fs');
const { request } = require('http');

/*exports.postHachage = (req, res, next) => {
    Auth.hach()
        .then(auths => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.postLogin = (req, res, next) => {
    Auth.login({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};*/