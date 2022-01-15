const db = require('../models');
const { Op } = require('sequelize');

const getAllAreas = async () => {
  let areas = await db.area.findAll({
    where: {
      deletedAt: null,
    },
    order: [['created_at', 'DESC']],
  });

  areas = areas.map((area) => {
    return {
      id: area.id,
      name: area.name,
      photo_url: area.photo_url,
      is_activated: area.is_activated,
    };
  });
  return areas;
};

module.exports = {
  getAllAreas,
};
