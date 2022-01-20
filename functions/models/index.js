const { Sequelize } = require('sequelize');
const sequelize = require('../loaders/sequelize');
const post = require('../models/post');
const user = require('../models/user');
const area = require('../models/area');
const spot = require('../models/spot');
const spot_photo = require('./spot_photo');
const order = require('../models/order');
const scrap = require('../models/scrap');

/*
User-Post 일대다 관계 (유저는 여러 개의 여행 후기를 작성할 수 있다.)
 */
user.hasMany(post, {
    sourceKey: 'id',
    foreignKey: 'author_id',
    as: 'posts'
});

post.belongsTo(user, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'author_id'
});


/*
Area-Post 일대다 관계 (특정 지역은 여러 개의 여행 후기를 포함할 수 있다.)
 */
area.hasMany(post, {
    sourceKey: 'id',
    foreignKey: 'area_id',
    as: 'posts'
})

post.belongsTo(area, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'area_id'
});

/*
Post-Spot 일대다 관계 (여행 후기 컨텐츠는 여러 개의 관광지를 포함할 수 있다.)
 */
post.hasMany(spot, {
    sourceKey: 'id',
    foreignKey: 'post_id',
    as: 'spots'
})

spot.belongsTo(post, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'post_id'
});

/*
user-order 일대다 관계 (유저는 여러개의 오더를 가질 수 잇다.)
 */
user.hasMany(order, {
    sourceKey: 'id',
    foreignKey: 'user_id',
})

order.belongsTo(user, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'user_id'
});

/*
post-order 일대다 관계 (여러개의 오더와 포스트가 있을 수 있다.)
 */
post.hasMany(order, {
    sourceKey: 'id',
    foreignKey: 'post_id',
})

order.belongsTo(post, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'post_id'
});

/*
user-scrap 일대다 관계 (유저는 여러개의 스크랩을 가질 수 잇다.)
 */
user.hasMany(scrap, {
    sourceKey: 'id',
    foreignKey: 'user_id',
})

scrap.belongsTo(user, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'user_id'
});

/*
post-scrap 일대다 관계 (여러개의 스크랩 포스트가 있을 수 있다.)
 */
post.hasMany(scrap, {
    sourceKey: 'id',
    foreignKey: 'post_id',
})

scrap.belongsTo(post, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'post_id'
});


/*
Spot-Spot_photo 일대다 관계 (관광지 별로 여러 개의 사진을 포함할 수 있다.)
 */
spot.hasMany(spot_photo, {
    sourceKey: 'id',
    foreignKey: 'spot_id',
    as: 'photo_urls'
})

spot_photo.belongsTo(spot, {
    onDelete: 'CASCADE',
    targetKey: 'id',
    foreignKey: 'spot_id'
});

/*
User-Post 다대다 관계 (각 유저는 여러 개의 여행 후기를 스크랩할 수 있다.)
 */
user.belongsToMany(post, {
    through: scrap,
    foreignKey: 'user_id',
});

post.belongsToMany(user, {
    through: scrap,
    foreignKey: 'post_id',
    hooks: true
});

/*
User-Post 다대다 관계 (각 유저는 여러 개의 여행 후기를 구매할 수 있다.)
 */
user.belongsToMany(post, {
    through: order,
    foreignKey: 'user_id',
});

post.belongsToMany(user, {
    through: order,
    foreignKey: 'post_id',
    hooks: true
});


const db = {
    Sequelize,
    sequelize,

    // table
    post,
    user,
    area,
    spot,
    spot_photo,
    scrap,
    order,
};

module.exports = db;