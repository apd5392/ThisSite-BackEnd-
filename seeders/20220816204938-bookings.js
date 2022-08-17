'use strict';
const {Comment, User, Location, Booking, sequelize}= require('../models')
const bookingDates = require('../data/bookings.json')
const {Op} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    const bookings = await Promise.all(
      bookingDates.map(async (bookingDate)=>{
        let user = await User.findOne({
          order: sequelize.random(),
          raw: true})
        let location = await Location.findOne({
          order: sequelize.random(),
          where: {user_Id: {[Op.not]: user.id}},
          raw: true
        })
        return {
          user_Id: user.id,
          location_Id: location.id,
          start_date: bookingDate.startDate,
          end_date: bookingDate.endDate,
        }
      })
    )
    return queryInterface.bulkInsert('bookings', bookings)
  },

  
  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('bookings')
  }
};
