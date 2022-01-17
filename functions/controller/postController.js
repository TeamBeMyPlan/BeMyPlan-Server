const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { postService } = require('../service');

const retrievePopularPosts = async (req, res) => {
    try {
        return res.status(statusCode.OK)
            .json(util.success(await postService.retrievePopularPosts()));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrieveLatestPosts = async (req, res) => {
    try {
        return res.status(statusCode.OK)
            .json(util.success(await postService.retrieveLatestPosts()));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

    const { page, pageSize } = req.query;

    return res.status(statusCode.OK).json(util.success(await postService.retrieveLatestListPosts(page, pageSize)));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
}

const retrieveRecommendationPosts = async (req, res) => {
  try {
    return res.status(statusCode.OK)
        .json(util.success(await postService.retrieveRecommendationPosts()));
  } catch (e) {
    console.log(e);
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
  }
};

const retrievePreviews = async (req, res) => {
    const { postId } = req.params;
    try {
        return res.status(statusCode.OK)
            .json(util.success(await postService.retrievePreviews(postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const retrievePreviewTags = async (req, res) => {
    const { postId } = req.params;
    try {
        return res.status(statusCode.OK)
            .json(util.success(await postService.retrievePreviewTags(postId)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

module.exports = {
    retrievePopularPosts,
    retrieveLatestPosts,
    retrieveRecommendationPosts,
    retrievePreviews,
    retrievePreviewTags,

    retrieveLatestListPosts
};