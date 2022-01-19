const express = require('express');
const router = express.Router();

const { userController } = require('../../controller');

router.get('/:userId/posts', userController.getPostsByUserId);

module.exports = router;