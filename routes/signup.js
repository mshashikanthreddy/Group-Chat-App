const express = require('express');

const  userController = require('../controllers/signup');

const router = express.Router();

router.post('/user/signUp',userController.signUp);

module.exports = router;