const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users can have many posts
User.hasMany(Post, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE', //  onDelete: it deletes the referencing rows in the child table when the referenced row is deleted in the parent
});

// Users can add many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
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

module.exports = { User, Post, Comment };

