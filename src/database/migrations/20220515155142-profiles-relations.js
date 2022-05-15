"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Profiles", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_profiles_users",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Profiles", {
      fields: ["genderId"],
      type: "foreign key",
      name: "fk_profiles_genders",
      references: {
        table: "Genders",
        field: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Profiles", "fk_profiles_users");
    await queryInterface.removeConstraint("Profiles", "fk_profiles_genders");
  },
};
