'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      result.belongsToMany(models.major, { through: 'resultMajors', foreignKey: 'resultID' })
      models.major.belongsToMany(result, { through: 'resultMajors', foreignKey: 'majorID' })
      
      result.belongsTo(models.student, { foreignKey: 'studentID' })
      models.student.hasOne(result, { foreignKey: 'studentID' })
    }
  }
  result.init({
    resultID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensure one result per student
    },
    resultText: {
      type: DataTypes.JSON 
    }
  }, {
    sequelize,
    modelName: 'result',
  });
  return result;
};