
const db = require('../models');

const getScrapPosts = async (userId, sort) => {
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
        order: [[sort, 'DESC']],
        raw: true,
    });
}

module.exports = {
    getScrapPosts,
    
};
