const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'testuser1',
    email: 'testuser1@example.com',
    password: 'password123'
  },
  {
    username: 'testuser2',
    email: 'testuser2@example.com',
    password: 'password123'
  },
  {
    username: 'testuser3',
    email: 'testuser3@example.com',
    password: 'password123'
  },
  // ... add as many users as you want
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
