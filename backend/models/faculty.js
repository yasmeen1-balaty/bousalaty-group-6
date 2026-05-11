'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        faculty.hasMany(models.expert, { foreignKey: 'facultyID' })
        models.expert.belongsTo(faculty, { foreignKey: 'facultyID' })

        faculty.hasMany(models.major, { foreignKey: 'facultyID' })
        models.major.belongsTo(faculty, { foreignKey: 'facultyID' })

        faculty.belongsTo(models.admin, { foreignKey: 'adminID' })
        models.admin.hasMany(faculty, { foreignKey: 'adminID' })
  }
}
  faculty.init({
    facultyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    facultyName: { 
      type: DataTypes.STRING,
       allowNull: false ,
        unique: true
      },
      adminID: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'faculty',
  });
  return faculty;
};