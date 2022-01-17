
const db = require('../models');

const getOrderPosts = async (userId) => {
    return await db.order.findAll({
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

module.exports = {
    getOrderPosts,
};
