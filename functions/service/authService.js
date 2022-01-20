const db = require('../models');
const jwt = require('jsonwebtoken');
const kakaoProfile = require('../utils/KakaoAuth');
const dotenv = require('dotenv');
dotenv.config();

const login = async (socialType, socialToken, nickname) => {
    if (socialType === 'KAKAO') {
        const result = await kakaoProfile.getProfile(socialToken);
        const socialId = String(JSON.parse(result).id);

        const [user, created] = await db.user.findOrCreate({
            where: {
                social_type: socialType,
                social_id: socialId,
            },
            defaults: {
                nickname: nickname,
                social_type: socialType,
                social_id: socialId,
            },
            attributes: ['id', 'nickname']
        });

        const access_token = jwt.sign({
            id: user.id,
            nickname: user.nickname,
        }, process.env.JWT_SCERET, {
            issuer: 'bemyplan',
        });
        //TODO refresh Token 구현!

        return {
            created: created,
            nickname: user.nickname,
            access_token: access_token
        };
    }

    // if (socialType === 'APPLE') {
    //
    // }
    // if (socialType === 'GOOGLE') {
    //
    // }
}

module.exports = {
    login,
}