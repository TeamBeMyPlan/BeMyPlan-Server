const express = require('express');
const router = express.Router();
const postApi = require('./postApi');
const areaApi = require('./areaApi');
const orderApi = require('./orderApi');

router.use('/post', postApi);
router.use('/area', areaApi);
router.use('/order', orderApi);
module.exports = router;
