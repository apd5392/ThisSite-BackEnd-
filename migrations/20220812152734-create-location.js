'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_Id: {
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      ammeneties: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      price: {
        type: Sequelize.FLOAT
      },
      availability: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};