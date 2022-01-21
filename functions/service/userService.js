const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');

const getPostsByUserId = async (authorId, otherId, page, pageSize, sort, order) => {
    const result = await db.post.findAndCountAll({
        attributes: ['id', 'thumbnail_url', 'title', 'created_at', 'price', 'order_count'],
        where: {
            deletedAt: null,
            author_id: authorId
        },
        include:[
            {
                model: db.order,
                where: {
                    user_id: otherId,
                },
                attributes: ['id'],
                required: false
            },
            {
                model: db.scrap,
                where: {
                    user_id: otherId,
                },
                attributes: ['id'],
                required: false
            },
            {
                model: db.user,
                attributes:['nickname']
            }
        ],
        order: [[sort, order]],
        offset: page * pageSize,
        limit: pageSize,
    });

    const totalCount = (await result).count;

    const totalPage = pagination.getTotalPage(totalCount, pageSize);
    
    let posts = (await result).rows;


     posts = posts.map(post => {
         const is_purchased = (post.orders.length) > 0 ? true : false;
         const is_scraped = (post.scraps.length) > 0 ? true : false;
         return {
             post_id: post.id,
             title: post.title,
             thumbnail_url: post.thumbnail_url,
             price:post.price,
             author: post.user.nickname,
             is_purchased,
             is_scraped,
         }
     })
     return {
        items: posts,
        totalPage: parseInt(totalPage)
      };
};

module.exports = {
    getPostsByUserId,
}