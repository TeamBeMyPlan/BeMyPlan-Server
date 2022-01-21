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
        return {
            statusCode,
            message,
        };
    },
};