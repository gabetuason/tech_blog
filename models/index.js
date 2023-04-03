const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Users can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Posts belong to a user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comments belong to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// a post can have multiple comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// a comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Users can add many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { Comment, Post, User };