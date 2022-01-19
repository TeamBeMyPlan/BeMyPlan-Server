const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { scrapService } = require('../service');

const getScarpByUserId = async (req, res) => {
  const { userId } = req.params;
  const page = req.params.page || 0;
  const pageSize = req.params.pageSize || 10;
  const sort = req.query.sort || 'createdAt';
  const order = req.query.order || 'DESC';

  try {
      return res.status(statusCode.OK).json(util.success(await scrapService.getScarpByUserId(userId, page, pageSize, sort, order)));
      //TODO: 구매여부도 함께 넘겨주기!
  } catch (e) {
      console.log(e);
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
}

const postScrapPosts = async (req, res) => {
    const { userId, postId } = req.query;
    try {
        return res.status(statusCode.OK)
            .json(util.success(await scrapService.postScrapPosts(userId, postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
  }

module.exports = {
    getScarpByUserId,
    postScrapPosts,
};