const express = require('express');
const router = express.Router();

const { postController } = require('../../controller')

router.get('/popular', postController.retrievePopularPosts);

module.exports = router;