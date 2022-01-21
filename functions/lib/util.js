const slackBot = require('../utils/slackBot');

module.exports = {
    success: (data) => {
        return {
            data
        };
    },
    successRes: (statusCode, message, data) => {
        return {
            statusCode,
            message,
            data
        };
    },
    fail: (statusCode, message) => {
        slackBot.send('api-서버-로그',
            `오류가 발생했습니다 !\n\`Status Code\`: ${statusCode}\n\`Error Message\`: ${message}\n`).then();
        return {
            statusCode,
            message,
        };
    },
};