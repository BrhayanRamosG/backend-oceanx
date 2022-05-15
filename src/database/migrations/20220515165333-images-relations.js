"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Images", {
      fields: ["itemId"],
      type: "foreign key",
      name: "fk_images_items",
      references: {
        table: "Items",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Images", "fk_images_items");
  },
};
