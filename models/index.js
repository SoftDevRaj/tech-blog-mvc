const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');

const models = {
  User: User.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = models;
