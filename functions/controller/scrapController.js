const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { scrapService } = require('../service');

const getScrapPosts = async (req, res) => {
  const { userId } = req.params;
  
  const { sort } = req.query;
  try {
      return res.status(statusCode.OK)
          .json(util.success(await scrapService.getScrapPosts(userId, sort)));
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
    getScrapPosts,
    postScrapPosts,
};