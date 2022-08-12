"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
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
          model: "user",
          key: "id",
        },
      },
      location_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "location_Id",
        onDelete: "CASCADE",
        references: {
          model: "location",
          key: "id",
        },
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      likes: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("comments");
  },
};
