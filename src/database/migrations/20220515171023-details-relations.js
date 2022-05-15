"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Details", {
      fields: ["billId"],
      type: "foreign key",
      name: "fk_bills_details",
      references: {
        table: "Bills",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Details", {
      fields: ["itemId"],
      type: "foreign key",
      name: "fk_bills_items",
      references: {
        table: "Items",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Details", "fk_bills_details");
    await queryInterface.removeConstraint("Details", "fk_bills_items");

  },
};
