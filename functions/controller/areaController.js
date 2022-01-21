const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {areaService} = require('../service');

const getAllAreas = async (req, res) => {
    return res.status(statusCode.OK).json(util.success(await areaService.getAllAreas()));
};

const getAllPostsByArea = async (req, res) => {
    const { areaId } = req.params;
    const userId = 3;
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';

    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.
    return res.status(statusCode.OK).json(util.success(await areaService.getAllPostsByArea(areaId, userId, page, pageSize, sort, order)));
}

module.exports = {
    getAllAreas,
    getAllPostsByArea
};
