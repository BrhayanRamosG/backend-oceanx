"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Bills", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_bills_users",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Bills", "fk_bills_users");
  },
};
