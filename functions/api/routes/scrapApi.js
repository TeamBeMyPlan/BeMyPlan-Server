const express = require('express');
const router = express.Router();

const { scrapController } = require('../../controller')

// router.post('/', scrapController.postScrapPosts);
router.get('/:userId', scrapController.getScarpByUserId); //TODO userId를 토큰에서 꺼내도록 변경 요망
router.post('/:postId', scrapController.scrapPostByPostId);

module.exports = router;