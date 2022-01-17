const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');

const retrievePopularPosts = async () => {
    let posts = await db.post.findAll({
       where: {
           deletedAt: null
       },
        order: [
            ['order_count', 'DESC']
            ],
        limit: 10
    });

    posts = posts.map((post) => {
        return {
            id: post.id,
            thumbnail_url: post.thumbnail_url,
            title: post.title
        };
    });
    posts.sort(() => Math.random() - 0.5);
    return posts;
}

const retrieveLatestPosts = async (page, pageSize) => {
  const result = db.post.findAndCountAll({
    attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'user.nickname'],
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

  const totalCount = (await result).count;
  const totalPage = pagination.getTotalPage(totalCount, pageSize)
  let posts = (await result).rows;

  return {
    items: posts,
    totalPage: parseInt(totalPage)
  };
};

const retrieveRecommendationPosts = async (page, pageSize) => {
  const result = db.post.findAndCountAll({
    attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'user.nickname'],
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

const retrievePreviews = async (postId) => {
    return await db.spot.findAll({
        attributes: ['description', 'photo_urls.photo_url'],
        where: {
            id: postId
        },
        include: {
            model: db.spot_photo,
            as: 'photo_urls',
            attributes: []
        },
        raw: true
    })
}

const retrievePreviewTags = async (postId) => {
    return await db.post.findOne({
        attributes: ['title', 'author_id', 'description', 'tag_theme', 'tag_count_spot', 'tag_count_day',
        'tag_count_restaurant', 'tag_partner', 'tag_money', 'tag_mobility', 'tag_month'],
        where: {
            id: postId,
        },
        include: {
            model: db.user,
            attributes: ['nickname'],
        },
        raw: true,
    });
}

module.exports = {
    retrievePopularPosts,
    retrieveLatestPosts,
    retrieveRecommendationPosts,
    retrievePreviews,
    retrievePreviewTags,
};
