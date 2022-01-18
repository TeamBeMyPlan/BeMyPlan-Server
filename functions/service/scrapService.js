const db = require('../models');
const pagination = require('../lib/pagination');

const getScarpByUserId = async (userId, page, pageSize, sort, order) => {
    const posts = await db.scrap.findAndCountAll({
        attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'post.price', 'user.nickname'],
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
        order: [[sort, order]],
        offset: page * pageSize,
        limit: pageSize,
        raw: true,
    });
    const totalCount = (await posts).count;
    const totalPage = pagination.getTotalPage(totalCount, pageSize)

    return {
        items: (await posts).rows,
        totalPage: parseInt(totalPage)
    };
}

const postScrapPosts = async (userId, postId) => {
    return await db.scrap.create({
        user_id: userId,
        post_id: postId
    });
}
module.exports = {
    getScarpByUserId,
    postScrapPosts,
};