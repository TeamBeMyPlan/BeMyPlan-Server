const db = require('../models');
const { Op } = require('sequelize');
const pagination  = require('../lib/pagination');

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

const retrieveLatestPosts = async () => {
  let posts = await db.post.findAll({
    where: {
      deletedAt: null,
    },
    order: [
        ['created_at', 'DESC']
    ],
    limit: 5,
  });

  posts = posts.map((post) => {
    return {
      id: post.id,
      thumbnail_url: post.thumbnail_url,
      title: post.title,
    };
  });
  return posts;
};


const retrieveRecommendationPosts = async () => {
  let posts = await db.post.findAll({
    where: {
      [Op.and]: [{ deletedAt: null }, { recommended: true }],
    },
    order: [['created_at', 'DESC']],
    limit: 5,
  });

  posts = posts.map((post) => {
    return {
      id: post.id,
      thumbnail_url: post.thumbnail_url,
      title: post.title,
    };
  });
  return posts;
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

const retrieveAuthorPosts = async (authorId, page, pageSize, sort) => {
  const result = db.post.findAndCountAll({
    attributes: ['post.id', 'post.thumbnail_url', 'post.title', 'user.nickname'],
    where: {
      deletedAt: null,
      author_id: authorId

    },
    include: {
      model: db.user,
      attributes: []
    },
    order: [[sort, 'DESC']],
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

module.exports = {
    retrievePopularPosts,
    retrieveLatestPosts,
    retrieveRecommendationPosts,
    retrievePreviews,
    retrievePreviewTags,

    retrieveAuthorPosts,
};

