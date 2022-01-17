
const db = require('../models');

const getScrapPosts = async (userId) => {
    return await db.scrap.findAll({
        attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'user.nickname'],
        where: {
            user_id: userId,
        },
        include: [
            {
                model: db.post,
                attributes: []
            },
            {
                model: db.user,
                attributes: []
            },
        ],
        order: [['created_at', 'DESC']],
        raw: true,
    });
}

const postScrapPosts = async (userId, postId) => {
    return await db.scrap.create({
        user_id: userId,
        post_id: postId
    });
}
module.exports = {
    getScrapPosts,
    postScrapPosts,
};
