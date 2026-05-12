'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      option.belongsTo(models.question, { foreignKey: 'questionID' })
      models.question.hasMany(option, { foreignKey: 'questionID' })

      option.hasMany(models.response, { foreignKey: 'optionID' })
      models.response.belongsTo(option, { foreignKey: 'optionID' })
    }
  }
  option.init({
    optionID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    questionID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    optionText: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'option',
  });
  return option;
};