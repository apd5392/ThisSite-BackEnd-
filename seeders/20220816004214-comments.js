
'use strict'
const { User, Location, sequelize } = require('../models')
const { Op } = require('sequelize')
const falso = require('@ngneat/falso')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = await Promise.all(
      [...Array(100)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let location = await Location.findOne({
          order: sequelize.random(),
          where: { user_Id: { [Op.not]: user.id } },
          raw: true
        })
        return {
          rating: falso.randNumber({min: 0, max: 5}),
          content: falso.randParagraph(),
          likes: falso.randNumber({ min: 0, max: 40000 }),
          user_Id: user.id,
          location_Id: location.id
        }
      })
    )
    return queryInterface.bulkInsert('comments', comments)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments')
  }
}