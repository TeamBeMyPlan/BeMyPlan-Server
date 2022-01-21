const express = require('express');
const router = express.Router();

const { authController } = require('../../controller');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/check/nickname', authController.checkNicknameDuplicate);

module.exports = router;