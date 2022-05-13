"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Admin",
        lastName: "ADMIN",
        email: "admin@groupomania.com",
        password:
          "$2b$10$UUWRCHobLNESADOoBHEMaObppoZri2gvWOaYmEwtk0S6z8JVSwmXG",
        admin: true,
        profession: "Chargé de communication",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
