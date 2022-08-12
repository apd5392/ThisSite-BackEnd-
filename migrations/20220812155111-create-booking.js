"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_Id",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        }
      },
      location_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "location_Id",
        onDelete: "CASCADE",
        references: {
          model: "locations",
          key: "id",
        },
      },
      payment: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
