const express = require('express');

const  userController = require('../controllers/msg');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/user/sendmsg', userAuthentication.verification , userController.sendmessage);

router.get('/user/getmsg', userAuthentication.verification, userController.getmessage);

module.exports = router;