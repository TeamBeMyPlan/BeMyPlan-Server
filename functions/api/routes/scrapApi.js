const express = require('express');
const router = express.Router();

const { scrapController } = require('../../controller')

router.get('/:userId', scrapController.getScrapPosts);
router.post('/', scrapController.postScrapPosts);

module.exports = router;