const request = require('request');

module.exports = {
    getProfile(accessToken) {
        return new Promise((resolve, reject) => {
            request(
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                    url: 'https://kapi.kakao.com/v2/user/me',
                    method: 'GET',
                },
                (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        resolve(body);
                    }
                    reject(error);
                });
        });
    }
};