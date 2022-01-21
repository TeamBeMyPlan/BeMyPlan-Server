const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {orderService} = require('../service');

const getPurchasedPostsByUserId = async (req, res) => {
    const {userId} = req.params;
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 10;

    return res.status(statusCode.OK).json(util.success(await orderService.getPurchasedPostsByUserId(userId, page, pageSize)));
}

module.exports = {
    getPurchasedPostsByUserId,
};
