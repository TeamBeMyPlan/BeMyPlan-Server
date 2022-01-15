const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular', postController.retrievePopularPosts);
router.get('/new', postController.retrieveLatestPosts);
router.get('/suggest', postController.retrieveRecommendationPosts);

module.exports = router;