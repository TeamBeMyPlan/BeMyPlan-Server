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

const scrapPostByPostId = async (userId, postId) => {
    checkPostIsScrapped(userId, postId)
        .then(async scrapped => {
        if (scrapped) {
            await db.scrap.destroy({
                where: {
                    user_id: userId,
                    post_id: postId
                }
            });
        } else {
            await db.scrap.update({
                deletedAt: null
            }, {
                where: {
                    user_id: userId,
                    post_id: postId
                },
                paranoid: false
            });
        }});
    const scrapCount = await db.scrap.count({
        where: {
            user_id: userId,
            post_id: postId,
            deletedAt: null
        }
    });
    const scrapped = scrapCount === 0 ? false : true;
    console.log(scrapped);
    return {
        scrapped
    };
}

const checkPostIsScrapped = async (userId, postId) => {
    return await db.scrap.count({
        where: {
            user_id: userId,
            post_id: postId,
            deletedAt: null,
        }
    }).then(count => {return count !== 0;});
}

module.exports = {
    getScarpByUserId,
    scrapPostByPostId,
};