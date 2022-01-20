const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');
const { Sequelize } = require('../models');

const FETCH_SIZE_POPULAR_POST = 10;

const retrievePopularPosts = async () => {
    const posts = await db.post.findAll({
       attributes: ['id', 'thumbnail_url', 'title'],
       where: {
           deletedAt: null
       },
        order: [
            ['order_count', 'DESC']
            ],
        limit: FETCH_SIZE_POPULAR_POST
    });

    posts.sort(() => Math.random() - 0.5);
    return posts;
}

const checkPostIsPurchased = async (userId, postId) => {
    const order = db.order.findOne({
        where: {
            user_id: userId,
            post_id: postId,
            deleteAt: null,
        }
    });
    return (order != null) ? true : false;
}

const retrieveLatestPosts = async (page, pageSize) => {
  const posts = db.post.findAndCountAll({
    attributes: ['id', 'thumbnail_url', 'title', 'price', 'user.nickname'],
    where: {
      deletedAt: null,
    },
    include: {
      model: db.user,
      attributes: []
    },
    order: [['created_at', 'DESC']],
    offset: page * pageSize,
    limit: pageSize,
    raw: true
  });

  const totalCount = (await posts).count;
  const totalPage = pagination.getTotalPage(totalCount, pageSize)

  return {
    items: (await posts).rows,
    totalPage: parseInt(totalPage)
  };
};

const retrieveRecommendationPosts = async (page, pageSize) => {
  const result = db.post.findAndCountAll({
    attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'price', 'user.nickname'],
    where: {
      deletedAt: null,
      recommended: true
    },
    include: {
      model: db.user,
      attributes: []
    },
    order: [['created_at', 'DESC']],
    offset: page * pageSize,
    limit: pageSize,
    raw: true
  });

  const totalCount = (await result).count;
  const totalPage = pagination.getTotalPage(totalCount, pageSize)
  let posts = (await result).rows;

  return {
    items: posts,
    totalPage: parseInt(totalPage)
  };
};

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

const retrievePostsByRandom = async () => {
   return await db.post.findAll({
       attributes: ['id', 'thumbnail_url', 'title'],
       where: {
           deletedAt: null
       },
       order: Sequelize.literal('random()'),
       limit: 5
    });

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