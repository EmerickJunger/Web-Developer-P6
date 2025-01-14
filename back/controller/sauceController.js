const Sauce = require("../models/sauce");
const fs = require('fs');
const { request } = require('http');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.postCreateSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
      likes: 0,
      dislikes: 0,
    });
    sauce.save()
        .then(() => res.status(201).json({ message : 'Sauce enregistré !'}))
        .catch(error => {res.status(400).json({ error });
    });
};

exports.putModifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message : 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
    .then(sauce => { 
      const filename = sauce.imageUrl.split('/images/')[1]; 
      fs.unlink(`images/${filename}`, () => { 
        Sauce.deleteOne({ _id: req.params.id }) 
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
  
exports.postStatut = (req, res, next) => {
    const like = req.body.like; 
    const userId = req.body.userId;
  
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => { 
      switch (like) {
        case 1: 
        if ( sauce.usersLiked.includes(userId) ) {
          alert('message: votre sauce est déjà enregistré dans vos likes');
        } else { 
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 },  $push: { usersLiked: userId } })
          .then(() => res.status(200).json({ message : 'Like ajouté !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;
  
        case -1:
        if ( sauce.usersDisliked.includes(userId) ) {
          alert('message: votre sauce est déjà enregistré dans vos disLikes');
        } else {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 },  $push: { usersDisliked: userId } })
          .then(() => res.status(200).json({ message : 'Dislike ajouté !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;
  
        case 0:
        if ( sauce.usersLiked.includes(userId) ) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1},  $pull: { usersLiked: userId } })
          .then(() => res.status(200).json({ message : 'Like retiré !'}))
          .catch(error => res.status(400).json({ error }));
        } else {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1},  $pull: { usersDisliked: userId } })
          .then(() => res.status(200).json({ message : 'Like retiré !'}))
          .catch(error => res.status(400).json({ error }));
        }
      }
    })
    .catch(error => res.status(400).json({ error }));
};