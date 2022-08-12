"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init(
    {
      user_Id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "user",
          key: "id",
        },
      },
      images: DataTypes.ARRAY(DataTypes.STRING),
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      ammeneties: DataTypes.ARRAY(DataTypes.STRING),
      price: DataTypes.FLOAT,
      availability: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "locations",
    }
  );
  return Location;
};
