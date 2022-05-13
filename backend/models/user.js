"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // associations entre tables
    static associate(models) {
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z\u00C0-\u00FF ,'-]+$/i,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          is: /^[a-z\u00C0-\u00FF ,'-]+$/i,
        },
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: DataTypes.STRING,
      userDescription: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
