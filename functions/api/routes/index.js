const express = require('express');
const router = express.Router();
const postApi = require('./postApi');
const areaApi = require('./areaApi');

router.use('/post', postApi);
router.use('/', areaApi);
module.exports = router;
