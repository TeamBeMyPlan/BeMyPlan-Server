const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');

const getAllAreas = async () => {
  return await db.area.findAll({
    attributes: ['id', 'name', 'photo_url', 'is_activated'],
    where: {
      deletedAt: null,
    },
    order: [['created_at', 'DESC']],
  });
};

const getAllPostsByArea = async(areaId, page, pageSize, sort) => {
  const result = db.post.findAndCountAll({
    where: {
      deletedAt: null,
      area_id: areaId
    },
    include: {
      model: db.user,
      attributes: ['nickname']
    },
    order: [[sort, 'DESC']],
    offset: page * pageSize,
    limit: pageSize
  });

  const totalCount = (await result).count;
  const totalPage = pagination.getTotalPage(totalCount, pageSize);
  let posts = (await result).rows;

  posts = posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      thumbnail_url: post.thumbnail_url,
      nickname: post.nickname,
    };
  });

  return {
    items: posts,
    totalPage: parseInt(totalPage)
  };
}

module.exports = {
  getAllAreas,
  getAllPostsByArea
};
