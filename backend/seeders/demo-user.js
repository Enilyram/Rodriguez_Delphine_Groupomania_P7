"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Modo",
        lastName: "Sanscollier",
        email: "modo@groupomania.fr",
        password:
          "$2b$10$.GyAOi9lBxDi6MhfQY4CY.xmEjHhesd3Y1oazQELYkTF/mVTDEdXK",
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
