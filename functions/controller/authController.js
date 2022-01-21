const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {authService} = require('../service');

const signUp = async (req, res) => {
    const {social_type, social_token, nickname} = req.body;
    return res.status(statusCode.OK).json(util.success(await authService.signUp(social_type, social_token, nickname)));
}

const login = async (req, res) => {
    const {social_type, social_token} = req.body;
    const result = await authService.login(social_type, social_token);
    res.status(result.statusCode).json(result);
}

module.exports = {
    signUp,
    login,
};