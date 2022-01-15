const db = require('../models');

const retrievePopularPosts = async () => {
    let posts = await db.post.findAll({
       where: {
           is_deleted: null
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

module.exports = {
    retrievePopularPosts,
}