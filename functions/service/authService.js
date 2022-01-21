const db = require('../models');
const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const jwt = require('jsonwebtoken');
const kakaoProfile = require('../utils/KakaoAuth');
const dotenv = require('dotenv');
dotenv.config();

const signUp = async (socialType, socialToken, nickname) => {
    if (socialType === 'KAKAO') {
        const result = await kakaoProfile.getProfile(socialToken);
        const socialId = String(JSON.parse(result).id);

        const user = await db.user.create({
            social_type: socialType,
            social_id: socialId,
            nickname: nickname
        });

        const access_token = jwt.sign({
            id: user.id,
            nickname: user.nickname,
        }, process.env.JWT_SCERET, {
            issuer: 'bemyplan',
        });

        return {
            nickname: user.nickname,
            access_token: access_token
        };
    }
}

const login = async (socialType, socialToken) => {
    if (socialType === 'KAKAO') {
        const result = await kakaoProfile.getProfile(socialToken);
        const socialId = String(JSON.parse(result).id);

        const user = await db.user.findOne({
            where: {
                social_type: socialType,
                social_id: socialId,
            },
            attributes: ['id', 'nickname']
        });

        if (user === null) {
            return util.fail(statusCode.FORBIDDEN, responseMessage.FORBIDDEN_EXCEPTION);
        }

        const access_token = jwt.sign({
            id: user.id,
            nickname: user.nickname,
        }, process.env.JWT_SCERET, {
            issuer: 'bemyplan',
        });

        const returnValue = {
            nickname: user.nickname,
            access_token: access_token
        };
        return util.successRes(statusCode.OK, responseMessage.SUCCESS_LOGIN, returnValue);
    }
}

module.exports = {
    signUp,
    login,
}