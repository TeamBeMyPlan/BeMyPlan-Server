const express = require('express');
const router = express.Router();

const { areacontroller } = require('../../controller');

router.get('/', areacontroller.retrieveAreaAllPost);

module.exports = router;
