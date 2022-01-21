const db = require('../models');
const { Op } = require('sequelize');
const pagination = require('../lib/pagination');

const getAllAreas = async () => {
  const areas =  await db.area.findAll({
    attributes: ['id', 'name', 'photo_url', 'is_activated'],
    where: {
      deletedAt: null,
    },
    order: [['created_at', 'DESC']],
  });
  return areas.map(area => {
    return {
        area_id: area.id,
        name: area.name,
        photo_url: area.photo_url,
        is_activated: area.is_activated
    }
  })
};

const getAllPostsByArea = async(areaId, userId, page, pageSize, sort, order) => {
  const result = await db.post.findAndCountAll({
    attributes: ['id', 'thumbnail_url', 'price', 'title', 'created_at', 'price', 'order_count' ],
    where: {
        deletedAt: null,
        area_id: areaId
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
     order: [[sort, 'DESC']],
     offset: page * pageSize,
     limit: 10
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
         price: post.price,
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

module.exports = {
  getAllAreas,
  getAllPostsByArea
};
