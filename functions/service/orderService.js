const db = require('../models');
const pagination = require('../lib/pagination');

const getPurchasedPostsByUserId = async (userId, page, pageSize) => {
    const posts = await db.order.findAndCountAll({
        attributes: ['post.id', 'post.thumbnail_url', 'post.title', [db.Sequelize.col('user.nickname'), 'author']],
        where: {
            user_id: userId,
        },
        include: [
            {
                model: db.post,
                attributes: [],
            },
            {
                model: db.user,
                attributes: []
            },
        ],
        order: [['created_at', 'DESC']],
        raw: true,
        offset: page * pageSize,
        limit: pageSize,
    });
    const totalCount = (await posts).count;
    const totalPage = pagination.getTotalPage(totalCount, pageSize)

    return {
        items: (await posts).rows,
        totalCount: totalCount,
        totalPage: parseInt(totalPage),
    };
}

module.exports = {
    getPurchasedPostsByUserId,
};
