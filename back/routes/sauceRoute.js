const express = require('express');
const router = express.Router();

const sauceController = require('../controller/sauceController');

router.get('/', sauceController.getAllSauces);
router.get('/:id', sauceController.getOneSauce);
//router.post('/', sauceController.postImageUrl);
//router.put('/:id', sauceController.put);
//router.delete('/:id', sauceController.delete);
//router.post('/:id/like', sauceController.post);

module.exports = router;