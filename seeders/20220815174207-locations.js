'use strict';
const locations = require('../data/locations.json')
const {User, sequelize}= require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const newLocations = await Promise.all(
      
      locations.map(async(location)=>{
      const user = await User.findOne({order: sequelize.random(), raw: true})
      return{
        user_Id: user.id,
        name: location.name,
        images: location.images,
        address: location.address,
        description: location.description,
        price: location.price,
        availability: location.availability
      }
    }))
    return queryInterface.bulkInsert('locations', newLocations)
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('locations')
  }
};
