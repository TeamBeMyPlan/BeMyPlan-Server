const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {userService} = require('../service');

const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    const otherId = 3;
    const page = req.params.page || 0;
    const pageSize = req.params.pageSize || 10;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';

    return res.status(statusCode.OK).json(util.success(await userService.getPostsByUserId(userId, otherId, page, pageSize, sort, order)));
    //TODO: 구매여부도 함께 넘겨주기!
}

module.exports = {
    getPostsByUserId,
};