const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular', postController.retrievePopularPosts);
router.get('/new', postController.retrieveLatestPosts);
router.get('/suggest', postController.retrieveRecommendationPosts);
router.get('/:postId/preview', postController.retrievePreviews);
router.get('/:postId/preview/tag', postController.retrievePreviewTags);

module.exports = router;