const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular', postController.retrievePopularPosts);
router.get('/new', postController.retrieveLatestPosts);
router.get('/random/:userId', postController.retrievePostsByRandom);
router.get('/suggest', postController.retrieveRecommendationPosts);
router.get('/:postId', postController.getPostDetail);
router.get('/:postId/preview', postController.retrievePreviews);
router.get('/:postId/preview/tag', postController.retrievePreviewTags);


module.exports = router;