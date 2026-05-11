'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      response.belongsTo(models.student, { foreignKey: 'studentID' })
      models.student.hasMany(response, { foreignKey: 'studentID' })

      response.belongsTo(models.question, { foreignKey: 'questionID' })
      models.question.hasMany(response, { foreignKey: 'questionID' })

      response.belongsTo(models.option, { foreignKey: 'optionID' })
      models.option.hasMany(response, { foreignKey: 'optionID' })
    }
  }
  response.init({
    responseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    optionID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'response',
  });
  return response;
};