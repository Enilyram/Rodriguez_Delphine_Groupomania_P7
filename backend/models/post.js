"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    // associations entre les tables
    static associate(models) {
      Post.belongsTo(
        models.User,
        { foreignKey: "userId" },
        { onDelete: "cascade", hooks: true }
      );
      Post.hasMany(models.Comment);
      Post.hasMany(models.LikePost);
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
