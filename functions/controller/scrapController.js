const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {scrapService} = require('../service');

const getScarpByUserId = async (req, res) => {
    const userId = 3
    const page = req.params.page || 0;
    const pageSize = req.params.pageSize || 10;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';

    return res.status(statusCode.OK).json(util.success(await scrapService.getScarpByUserId(userId, page, pageSize, sort, order)));
    //TODO: 구매여부도 함께 넘겨주기!
}

const scrapPostByPostId = async (req, res) => {
    const {postId} = req.params;
    const userId = 3; // TODO: 토큰으로 변경
    return res.status(statusCode.OK).json(util.success(await scrapService.scrapPostByPostId(userId, postId)));
}

module.exports = {
    getScarpByUserId,
    scrapPostByPostId,
};