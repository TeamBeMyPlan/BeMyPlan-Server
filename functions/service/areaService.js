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

const getAllPostsByArea = async(areaId, page, pageSize, sort, order) => {
  const posts = db.post.findAndCountAll({
    attributes: ['id', 'title', 'thumbnail_url', [db.Sequelize.col('user.nickname'), 'author']],
    where: {
      deletedAt: null,
      area_id: areaId
    },
    include: {
      model: db.user,
      attributes: []
    },
    raw: true,
    order: [[sort, order]],
    offset: page * pageSize,
    limit: pageSize
  });

  const totalCount = (await posts).count;
  const totalPage = pagination.getTotalPage(totalCount, pageSize);

  return {
    items: (await posts).rows,
    totalPage: parseInt(totalPage)
  };
}

module.exports = {
  getAllAreas,
  getAllPostsByArea
};
