const express = require('express');
const router = express.Router();

const { orderController } = require('../../controller')

router.get('/:userId', orderController.getOrderPosts);

module.exports = router;