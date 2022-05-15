"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Problem);
      this.belongsTo(models.Urgency);
      this.belongsTo(models.State);
      this.belongsTo(models.User);
    }
  }
  Form.init(
    {
      coordinates: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      description: DataTypes.STRING,
      problemId: DataTypes.INTEGER,
      urgencyId: DataTypes.INTEGER,
      stateId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Form",
    }
  );
  return Form;
};
