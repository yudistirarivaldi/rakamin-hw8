"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("password", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Yudistira Rivaldi",
          email: "yudis@gmail.com",
          password: password,
          gender: "Male",
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
