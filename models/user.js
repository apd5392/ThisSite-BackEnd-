"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Location, { as:'host', foreignKey: "user_Id" });
      User.belongsToMany(models.Location,{through:models.Booking, as: 'customer', foreignKey: "user_Id" });
      User.hasMany(models.Comment, { as:'comment-creator', foreignKey: "user_Id" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      creditCardInfo: DataTypes.ARRAY(DataTypes.JSON),
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
