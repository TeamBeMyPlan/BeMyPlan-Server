const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');

const { authService } = require('../service');

const signUp = async (req, res) => {
    const { social_type, social_token, nickname } = req.body;
    try {
        return res.status(statusCode.OK).json(util.success(await authService.signUp(social_type, social_token, nickname)));
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

const login = async (req, res) => {
    const { social_type, social_token } = req.body;
    try {
        const result = await authService.login(social_type, social_token);
        res.status(result.statusCode).json(result);
    } catch (e) {
        console.log(e);
        return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.VALIDATION_EXCEPTION));
    }
}

module.exports = {
    signUp,
    login,
};