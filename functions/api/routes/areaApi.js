const express = require('express');
const router = express.Router();

const { areacontroller } = require('../../controller');

router.get('/', areacontroller.getAllAreas);

module.exports = router;
