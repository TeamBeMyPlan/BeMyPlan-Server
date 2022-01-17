const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular', postController.retrievePopularPosts);

router.get('/new', postController.retrieveLatestPosts);
router.get('/new/list', postController.retrieveLatestListPosts);

router.get('/suggest', postController.retrieveRecommendationPosts);
router.get('/suggest/list', postController.retrieveRecommendationListPosts);

router.get('/:postId/preview', postController.retrievePreviews);
router.get('/:postId/preview/tag', postController.retrievePreviewTags);

router.get('/', postController.retrieveAuthorPosts);

module.exports = router;