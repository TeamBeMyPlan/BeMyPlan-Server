const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { postService } = require('../service');

const retrievePopularPosts = async (req, res) => {
  try {
    return res.status(statusCode.OK).json(util.success(await postService.retrievePopularPosts()));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
};

const retrieveLatestPosts = async (req, res) => {
  try {
    return res.status(statusCode.OK).json(util.success(await postService.retrieveLatestPosts()));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
};

module.exports = {
  retrievePopularPosts,
  retrieveLatestPosts,
};
