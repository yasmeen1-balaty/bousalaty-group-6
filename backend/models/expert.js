'use strict';
const {
  Model
} = require('sequelize');
// const faculty = require('./faculty'); --> this may cause circular dependency, so we will define the association in the index.js file instead
module.exports = (sequelize, DataTypes) => {
  class expert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      expert.belongsTo(models.faculty, { foreignKey: 'facultyID' })
      models.faculty.hasMany(expert, { foreignKey: 'facultyID' })

        expert.belongsTo(models.admin, { foreignKey: 'adminID' })
        models.admin.hasMany(expert, { foreignKey: 'adminID' })
    }
  }
  expert.init({
    expertID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facultyID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      adminID: {
      type: DataTypes.INTEGER
      }
  }, {
    sequelize,
    modelName: 'expert',
  });
  return expert;
};