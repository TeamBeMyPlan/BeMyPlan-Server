const express = require('express');
const router = express.Router();

const { areaController } = require('../../controller');

router.get('/', areaController.getAllAreas);
router.get('/:areaId', areaController.getAllPostsByArea);

module.exports = router;