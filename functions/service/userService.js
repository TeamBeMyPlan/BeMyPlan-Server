const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');

const getPostsByUserId = async (authorId, page, pageSize, sort, order) => {
    const posts = await db.post.findAndCountAll({
        attributes: ['id', 'thumbnail_url', 'title'],
        where: {
            deletedAt: null,
            author_id: authorId
        },
        order: [[sort, order]],
        offset: page * pageSize,
        limit: pageSize,
    });
    const totalCount = posts.count;
    const totalPage = pagination.getTotalPage(totalCount, pageSize);

    return {
        items: posts.rows,
        totalPage: parseInt(totalPage)
    };
};

module.exports = {
    getPostsByUserId,
}