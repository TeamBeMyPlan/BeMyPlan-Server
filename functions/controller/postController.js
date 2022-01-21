const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {postService} = require('../service');

const retrievePopularPosts = async (req, res) => {
    const userId = 3;
    return res.status(statusCode.OK).json(util.success(await postService.retrievePopularPosts(userId)));
}

const retrieveLatestPosts = async (req, res) => {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.
    const userId = 3;
    return res.status(statusCode.OK).json(util.success(await postService.retrieveLatestPosts(userId, page, pageSize)));
}

const retrieveRecommendationPosts = async (req, res) => {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 5;
    //TODO 토큰에서 유저 정보 확인한 뒤, 서비스 함수 호출할 때 함께 넘겨 각 게시글에 대한 구매 여부 확인(boolean) 함께 넘겨줘야 함.

    const userId = 3;
    return res.status(statusCode.OK).json(util.success(await postService.retrieveRecommendationPosts( userId, page, pageSize)));
};

const getPostDetail = async (req, res) => {
    const {postId} = req.params;
    return res.status(statusCode.OK).json(util.success(await postService.getPostDetail(postId)));
}

const retrievePreviews = async (req, res) => {
    const {postId} = req.params;
    return res.status(statusCode.OK).json(util.success(await postService.retrievePreviews(postId)));
}

const retrievePreviewTags = async (req, res) => {
    const {postId} = req.params;
    return res.status(statusCode.OK).json(util.success(await postService.retrievePreviewTags(postId)));
}

const retrievePostsByRandom = async (req, res) => {
    const userId = 3;
    return res.status(statusCode.OK).json(util.success(await postService.retrievePostsByRandom(userId)));
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