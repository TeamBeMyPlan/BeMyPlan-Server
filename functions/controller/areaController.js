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

const getAllPostsByArea = async (req, res) => {
  try {
    const { areaId } = req.params;
    const userId = 3;
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';

    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.

    return res.status(statusCode.OK).json(util.success(await areaService.getAllPostsByArea(areaId, userId, page, pageSize, sort, order)));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
}

module.exports = {
  getAllAreas,
  getAllPostsByArea
};
