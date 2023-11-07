// index.js in the models folder

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // if a User is deleted, delete all their Posts
});

// Posts belong to Users
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // if a User is deleted, delete their Posts
});

// Users have many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // if a User is deleted, delete all their Comments
});

// Comments belong to Users
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // if a User is deleted, their Comments are deleted as well
});

// Posts have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE' // if a Post is deleted, delete all related Comments
});

// Comments belong to Posts
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE' // if a Post is deleted, the related Comments are deleted as well
});

module.exports = { User, Post, Comment };

