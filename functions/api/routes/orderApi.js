const express = require('express');
const router = express.Router();

const { orderController } = require('../../controller')

router.get('/', orderController.getPurchasedPostsByUserId); //TODO 토큰에서 유저 정보 꺼내기

module.exports = router;