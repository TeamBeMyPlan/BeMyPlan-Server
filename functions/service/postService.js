const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');
const { Sequelize } = require('../models');

const FETCH_SIZE_POPULAR_POST = 10;

const retrievePopularPosts = async (userId) => {
    let posts = await db.post.findAll({
       attributes: ['id', 'thumbnail_url', 'title', 'order_count'],
       where: {
           deletedAt: null
       },
       include: [
        {
            model: db.user,
            attributes:['nickname'],
            // required: false,
        },
        {
            model: db.order,
            where: {
                user_id: userId,
            },
            attributes: ['id'],
            required: false
        },
    ],
        order: [['order_count', 'DESC']],
        // raw:true,
        limit: FETCH_SIZE_POPULAR_POST
    });

    return posts.map(post => {
        const is_purchased = (post.orders.length) > 0 ? true : false;
        return {
            post_id: post.id,
            title: post.title,
            author: post.user.nickname,
            thumbnail_url: post.thumbnail_url,
            is_purchased,
        }
    })
}

const checkPostIsPurchased = async (userId, postId) => {
    const order = db.order.findOne({
        where: {
            user_id: userId,
            post_id: postId,
            deleteAt: null,
        }
    });
    return order !== null;
}

const retrieveLatestPosts = async (userId, page, pageSize) => {
    const result = await db.post.findAndCountAll({
        attributes: ['id', 'thumbnail_url', 'title', 'created_at'],
        where: {
            deletedAt: null
        },
        include: [
         {
             model: db.user,
             attributes:['nickname'],
             // required: false,
         },
         {
             model: db.order,
             where: {
                 user_id: userId,
             },
             attributes: ['id'],
             required: false
         },
         {
             model: db.scrap,
             where: {
                 user_id: userId,
             },
             attributes: ['id'],
             required: false
         },
     ],
         order: [['created_at', 'DESC']],
         offset: page * pageSize,
         limit: FETCH_SIZE_POPULAR_POST
     });
     const totalCount = (await result).count;
     const totalPage = pagination.getTotalPage(totalCount, pageSize)

     let posts = (await result).rows;

     posts = posts.map(post => {
         const is_purchased = (post.orders.length) > 0 ? true : false;
         const is_scraped = (post.scraps.length) > 0 ? true : false;
         return {
             post_id: post.id,
             title: post.title,
             author: post.user.nickname,
             thumbnail_url: post.thumbnail_url,
             is_purchased,
             is_scraped,
         }
     })
     return {
        items: posts,
        totalPage: parseInt(totalPage)
      };

  
};

const retrieveRecommendationPosts = async (userId, page, pageSize) => {
    const result = await db.post.findAndCountAll({
        attributes: ['id', 'thumbnail_url', 'title', 'created_at'],
        where: {
            deletedAt: null,
            recommended: true
        },
        include: [
         {
             model: db.user,
             attributes:['nickname'],
             // required: false,
         },
         {
             model: db.order,
             where: {
                 user_id: userId,
             },
             attributes: ['id'],
             required: false
         },
         {
             model: db.scrap,
             where: {
                 user_id: userId,
             },
             attributes: ['id'],
             required: false
         },
     ],
         order: [['created_at', 'DESC']],
         offset: page * pageSize,
         limit: FETCH_SIZE_POPULAR_POST
     });
     const totalCount = (await result).count;
     const totalPage = pagination.getTotalPage(totalCount, pageSize)

     let posts = (await result).rows;

     posts = posts.map(post => {
         const is_purchased = (post.orders.length) > 0 ? true : false;
         const is_scraped = (post.scraps.length) > 0 ? true : false;
         return {
             post_id: post.id,
             title: post.title,
             author: post.user.nickname,
             thumbnail_url: post.thumbnail_url,
             is_purchased,
             is_scraped,
         }
     })
     return {
        items: posts,
        totalPage: parseInt(totalPage)
      };
}


const getPostDetail = async (postId) => {
    const postInfo = await db.post.findOne({
        attributes: ['author_id', [db.Sequelize.col('user.nickname'), 'author'], 'title', ['tag_count_day', 'totalDays']],
        where: {
            id: postId,
        },
        include: {
            model: db.user,
            attributes: []
        },
        raw: true
    });

    const findSpots = await db.spot.findAll({
        attributes: { exclude: ['id', 'created_at', 'updated_at', 'deleted_at', 'post_id']},
        where: {
            post_id: postId
        },
        include: {
            model: db.spot_photo,
            as: 'photo_urls',
            attributes: ['photo_url']
        },
    });

    const spots = Array.from(Array(postInfo.totalDays), () => Array().fill(null));
    for (const spot of findSpots) {
        const photoUrls = spot.photo_urls.map((photoUrl) => photoUrl.photo_url);
        spots[spot.day-1][spot.sequence-1] = {
            title: spot.title,
            description: spot.description,
            photo_urls: photoUrls,
            address: spot.address,
            latitude: spot.latitude,
            longitude: spot.longitude,
            next_spot_mobility: spot.next_spot_mobility,
            next_spot_required_time: spot.next_spot_required_time
        };
    }

    return {
        author_id: postInfo.author_id,
        author: postInfo.author,
        title: postInfo.title,
        spots,
        total_days: postInfo.totalDays
    };
}

const retrievePreviews = async (postId) => {
    const spots = await db.spot.findAll({
        attributes: ['description'],
        where: {
            post_id: postId,
            is_preview: true,
        },
        include: {
            model: db.spot_photo,
            as: 'photo_urls',
            attributes: ['photo_url']
        },
    });

    const result = [];
    for (const spot of spots) {
        const photoUrls = spot.photo_urls.map((photoUrl) => photoUrl.photo_url);
        result.push({
            description: spot.description,
            photo_urls: photoUrls,
        })
    }
    return result;
}

const retrievePreviewTags = async (postId) => {
    return await db.post.findOne({
        attributes: {
            exclude: ['id', 'thumbnail_url', 'order_count', 'recommended', 'recommended_date',
                'createdAt', 'updatedAt', 'deletedAt', 'author_id', 'area_id'],
            include: [[db.Sequelize.col('user.nickname'), 'author'], 'author_id']
        },
        where: {
            id: postId,
        },
        include: {
            model: db.user,
            attributes: [],
        },
        raw: true,
    });
}

const retrievePostsByRandom = async (userId) => {
   let posts = await db.post.findAll({
       attributes: ['id', 'title', 'thumbnail_url', 'price'],
       where: {
           deletedAt: null,
       },
       include: [
        {
            model: db.order,
            where: {
                user_id: userId,
            },
            attributes: ['id'],
            required: false
        },
    ],
       order: Sequelize.literal('random()'),
       limit: 10
    });
    return posts.map(post => {
        const is_purchased = (post.orders).length > 0 ? true : false;
        return {
            post_id: post.id,
            title: post.title,
            thumbnail_url: post.thumbnail_url,
            price: post.price,
            is_purchased,
        }
    })

}

module.exports = {
    retrievePopularPosts,
    retrieveLatestPosts,
    retrieveRecommendationPosts,
    retrievePreviews,
    retrievePreviewTags,
    getPostDetail,
    checkPostIsPurchased,
    retrievePostsByRandom
};