'use strict';
const users = [
  {
    userName: "jDoe1",
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@fake.com",
    phoneNumber: '(123)-456-7890',
    password: 'password',
  },
  {
    userName: 'jDoe2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@fake.com',
    phoneNumber: '(109)-876-5432',
    password: 'password',
  },
  {
    userName: 'mDavis76',
    firstName: 'Miller',
    lastName: 'Davis',
    email: 'millerdavis@fake.com',
    phoneNumber: '(323)-556-7190',
    password: 'password',
  },
  {
    userName: 'jjone27',
    firstName: 'John',
    lastName: 'Jones',
    email: 'johnjones@fake.com',
    phoneNumber: '(455)-789-0103',
    password: 'password',
  },
  {
    userName: 'jSmith1',
    firstName: 'Jan',
    lastName: 'Smith',
    email: 'jansmith@fake.com',
    phoneNumber: '(132)-466-7890',
    password: 'password',
  }  
] 

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users')
  }
};
