// Comment.js in the models folder

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Define the Comment model's fields and configuration
Comment.init(
  {
    // Define an ID column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // Define the comment text column
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1] // Comment must be at least one character long
      },
    },
    // Define the user_id column, which references the User model
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Define the post_id column, which references the Post model
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
