"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Forms", {
      fields: ["problemId"],
      type: "foreign key",
      name: "fk_forms_problems",
      references: {
        table: "Problems",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Forms", {
      fields: ["urgencyId"],
      type: "foreign key",
      name: "fk_forms_urgencies",
      references: {
        table: "Urgencies",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Forms", {
      fields: ["stateId"],
      type: "foreign key",
      name: "fk_forms_states",
      references: {
        table: "States",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Forms", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_forms_users",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Forms", "fk_forms_problems");
    await queryInterface.removeConstraint("Forms", "fk_forms_urgencies");
    await queryInterface.removeConstraint("Forms", "fk_forms_states");
    await queryInterface.removeConstraint("Forms", "fk_forms_users");
  },
};
