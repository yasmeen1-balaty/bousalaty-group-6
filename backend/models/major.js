'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      major.belongsTo(models.faculty, { foreignKey: 'facultyID' })
      models.faculty.hasMany(major, { foreignKey: 'facultyID' })

      
      major.belongsToMany(models.student, { through: 'studentMajors', foreignKey: 'majorID' })
      models.student.belongsToMany(major, { through: 'studentMajors', foreignKey: 'studentID' })

       major.hasMany(models.skills, { foreignKey: 'majorID' })
       models.skills.belongsTo(major, { foreignKey: 'majorID' })

       major.hasMany(models.jobOpportuneties, { foreignKey: 'majorID' })
       models.jobOpportuneties.belongsTo(major, { foreignKey: 'majorID' })

        major.belongsTo(models.admin, { foreignKey: 'adminID' })
        models.admin.hasMany(major, { foreignKey: 'adminID' })
    }
  }
  major.init({
    majorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    acceptanceGrade: DataTypes.FLOAT,
    creditHours: DataTypes.INTEGER,
    majorName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    costPerHour: DataTypes.INTEGER,
    studyPlanURL:{
       type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
    },
    acceptedBranches: {
      type : DataTypes.JSON,
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
    modelName: 'major',
  });
  return major;
};