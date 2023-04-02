const { Comment } = require('../models');

const commentdata = [
    {
     contents: "Very very good!",
     date_created: "01/19/2023",
     post_id: 3,
     user_id: 1,
    },
    {
     contents: "Ya that tip is useful.",
     date_created: "01/20/2023",
     post_id: 1,
     user_id: 2,
    },
    {
     contents: "very helpful blog post.",
     date_created: "02/20/2023",
     post_id: 2,
     user_id: 3,
    },
]

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
