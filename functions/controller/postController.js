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
}

const retrieveLatestPosts = async (req, res) => {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.
    try {
        return res.status(statusCode.OK).json(util.success(await postService.retrieveLatestPosts(page, pageSize)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrieveRecommendationPosts = async (req, res) => {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.
    try {
        return res.status(statusCode.OK).json(util.success(await postService.retrieveRecommendationPosts(page, pageSize)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
};

const getPostDetail = async (req, res) => {
    const { postId } = req.params;
    try {
        return res.status(statusCode.OK).json(util.success(await postService.getPostDetail(postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrievePreviews = async (req, res) => {
    const { postId } = req.params;
    try {
        return res.status(statusCode.OK).json(util.success(await postService.retrievePreviews(postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrievePreviewTags = async (req, res) => {
    const { postId } = req.params;
    try {
        return res.status(statusCode.OK).json(util.success(await postService.retrievePreviewTags(postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrievePostsByRandom = async (req, res) => {
    try {
        return res.status(statusCode.OK).json(util.success(await postService.retrievePostsByRandom()));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

module.exports = {
    retrievePopularPosts,
    retrieveLatestPosts,
    retrieveRecommendationPosts,
    getPostDetail,
    retrievePreviews,
    retrievePreviewTags,
    retrievePostsByRandom
};