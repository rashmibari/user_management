var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profile');

router.put('/updateProfile', profileController.updateProfile);
router.get('/getProfile/:email', profileController.getProfile);



module.exports = router;