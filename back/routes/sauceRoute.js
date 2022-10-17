const express = require('express');
const router = express.Router();

/*const auth = require('../middlewares/auth');*/
const multer = require('../middlewares/multer');

const sauceController = require('../controller/sauceController');

router.get('/', /*auth*/ sauceController.getAllSauces);
router.get('/:id', /*auth*/ sauceController.getOneSauce);
router.post('/', /*auth*/ multer, sauceController.postCreateSauce);
router.put('/:id', /*auth*/ /*multer,*/ sauceController.putModifySauce);
router.delete('/:id', /*auth*/ sauceController.deleteSauce);
router.post('/:id/like', /*auth*/ sauceController.postStatut);

module.exports = router;