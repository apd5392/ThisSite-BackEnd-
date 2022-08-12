"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.hasMany(models.User, { foreignKey: "user_Id" });
      Booking.hasMany(models.Location, { foreignKey: "location_Id" });

    }
  }
  Booking.init(
    {
      user_Id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE ",
        references: {
          model: "user",
          key: "id",
        },
      },
      location_Id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "location",
          key: "id",
        },
      },
      payment: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: 'bookings'
    }
  );
  return Booking;
};
