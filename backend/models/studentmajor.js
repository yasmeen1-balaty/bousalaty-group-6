'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentMajor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      studentMajor.belongsTo(models.student, { foreignKey: 'studentID' })
      models.student.belongsToMany(models.major, { through: 'studentMajors', foreignKey: 'studentID' })

      studentMajor.belongsTo(models.major, { foreignKey: 'majorID' })
      models.major.belongsToMany(models.student, { through: 'studentMajors', foreignKey: 'majorID' })
    }
  }
  studentMajor.init({
    majorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    }
  }, {
    sequelize,
    modelName: 'studentMajor',
    tableName: 'studentMajors',
  });
  return studentMajor;
};