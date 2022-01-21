const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { orderService } = require('../service');

const getPurchasedPostsByUserId = async (req, res) => {
    const userId = 3
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 10;

    try {
        return res.status(statusCode.OK).json(util.success(await orderService.getPurchasedPostsByUserId(userId, page, pageSize)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

module.exports = {
    getPurchasedPostsByUserId,
};
