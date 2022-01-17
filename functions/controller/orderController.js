const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { orderService } = require('../service');

const getOrderPosts = async (req, res) => {
  const { userId } = req.params;
  try {
      return res.status(statusCode.OK)
          .json(util.success(await orderService.getOrderPosts(userId)));
  } catch (e) {
      console.log(e);
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
}

module.exports = {
    getOrderPosts
};
