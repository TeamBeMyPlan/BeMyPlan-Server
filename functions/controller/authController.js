const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const {authService} = require('../service');
const slackBot = require("../utils/slackBot");

const signUp = async (req, res) => {
    const {social_type, social_token, nickname} = req.body;
    let response = await authService.signUp(social_type, social_token, nickname);
    slackBot.send('새로운-유저',
        `새로운 유저가 찾아왔어요🎉\n
        \`Social type\`: ${social_type}\n
        \`Nickname\`: ${nickname}`).then();

    return res.status(statusCode.OK).json(util.success(response));
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