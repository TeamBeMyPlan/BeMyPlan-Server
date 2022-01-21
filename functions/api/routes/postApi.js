const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular/:userId', postController.retrievePopularPosts);
router.get('/new/:userId', postController.retrieveLatestPosts);
router.get('/random/:userId', postController.retrievePostsByRandom);
router.get('/suggest/:userId', postController.retrieveRecommendationPosts);
router.get('/:postId', postController.getPostDetail);
router.get('/:postId/preview', postController.retrievePreviews);
router.get('/:postId/preview/tag', postController.retrievePreviewTags);


module.exports = router;