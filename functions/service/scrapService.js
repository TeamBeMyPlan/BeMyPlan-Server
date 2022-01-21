const db = require('../models');
const pagination = require('../lib/pagination');

const getScarpByUserId = async (userId, page, pageSize, sort, order) => {
    const result = await db.post.findAndCountAll({
        attributes: ['id', 'thumbnail_url', 'title', 'price', 'created_at', 'order_count'],
        where: {
            deletedAt: null
        },
        include: [
            {
                model: db.scrap,
                where: {
                    user_id: userId
                }
            },
            {
                model: db.order,
                where: {
                    user_id: userId
                },
                attributes: ['id']
            },
        ],
        order: [[sort, order]],
        offset: page * pageSize,
        limit: pageSize,
    });

    const totalCount = (await result).count;
    const totalPage = pagination.getTotalPage(totalCount, pageSize)

    let posts = (await result).rows;

     posts = posts.map(post => {
         const is_purchased = (post.orders.length) > 0 ? true : false;
         return {
             post_id: post.id,
             title: post.title,
             price: post.price,
             thumbnail_url: post.thumbnail_url,
             is_purchased,
         }
     })
     return {
        items: posts,
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