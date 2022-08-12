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
      // define association here
    }
  }
  Comment.init(
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
