var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

//registering user
router.post('/register', authController.register);
//login 
router.post('/login', authController.login);

module.exports = router;