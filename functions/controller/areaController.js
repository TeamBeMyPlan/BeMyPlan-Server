const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { areaService } = require('../service');

const getAllAreas = async (req, res) => {
  try {
    return res.status(statusCode.OK).json(util.success(await areaService.getAllAreas()));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
};

module.exports = {
  getAllAreas,
};
