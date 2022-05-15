"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsToMany(models.Item, { through: models.Detail });
    }
  }
  Bill.init(
    {
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
