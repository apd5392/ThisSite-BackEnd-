'use strict';
const users = require('../data/users.json')
const middleware = require('../middleware')
module.exports = {
  async up (queryInterface, Sequelize) {
    const newUsers = await Promise.all(
      users.map(async(user)=>{
        const {userName, firstName, lastName, email, phoneNumber, password} = user

        const passwordDigest = await middleware.hashPassword(password)

        return( 
            {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email:email,
            phoneNumber:phoneNumber,
            password:passwordDigest
        })

      })
    )
    return queryInterface.bulkInsert('users', newUsers)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users')
  }
};
