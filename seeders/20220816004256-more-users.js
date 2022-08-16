'use strict';
const users = require('../data/moreUsers.json')

module.exports = {
  async up (queryInterface, Sequelize) {
 return queryInterface.bulkInsert('users',users) 
 
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('users')
  }
};
