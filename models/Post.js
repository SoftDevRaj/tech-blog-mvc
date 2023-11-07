// Post.js in the models folder

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the Post model
class Post extends Model {}

// Define table columns and configuration for Post model
Post.init(
  {
    // Define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define a content column for the post body
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // The user_id column references the id from the User model, creating a foreign key
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
