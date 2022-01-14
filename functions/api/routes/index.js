const express = require('express');
const router = express.Router();
const postApi = require('./postApi');

router.use('/post', postApi);

module.exports = router;