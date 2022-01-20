const express = require('express');
const router = express.Router();

const postApi = require('./postApi');
const areaApi = require('./areaApi');
const orderApi = require('./orderApi');
const scrapApi = require('./scrapApi');
const userApi = require('./userApi');
const authApi = require('./authApi');

router.use('/post', postApi);
router.use('/area', areaApi);
router.use('/order', orderApi);
router.use('/scrap', scrapApi);
router.use('/user', userApi);
router.use('/auth', authApi);

module.exports = router;
