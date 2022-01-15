const db = require('../models');
const { Op } = require('sequelize');

const retrievePopularPosts = async () => {
  let posts = await db.post.findAll({
    where: {
      deletedAt: null,
    },
    order: [['order_count', 'DESC']],
    limit: 10,
  });

  posts = posts.map((post) => {
    return {
      id: post.id,
      thumbnail_url: post.thumbnail_url,
      title: post.title,
    };
  });
  posts.sort(() => Math.random() - 0.5);
  return posts;
};

const retrieveLatestPosts = async () => {
  let posts = await db.post.findAll({
    where: {
      deletedAt: null,
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

module.exports = {
  retrievePopularPosts,
  retrieveLatestPosts,
  retrieveRecommendationPosts,
};
