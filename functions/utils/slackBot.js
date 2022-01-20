const {WebClient} = require('@slack/web-api');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.SLACK_BOT_TOKEN;
const slack = new WebClient(token);

const send = async (channel, message) => {
    if (process.env.NODE_ENV === 'production') {
        await slack.chat.postMessage({
            channel: channel,
            text: message
        })
    }
}

module.exports = {
    send,
};