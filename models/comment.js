"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {foreignKey: 'user_Id'})
      Comment.belongsTo(models.Location, {foreignKey: 'location_Id'})
    }
  }
  Comment.init(
    {
      user_Id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE ",
        references: {
          model: "users",
          key: "id",
        },
      },
      location_Id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "locations",
          key: "id",
        },
      },
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};
