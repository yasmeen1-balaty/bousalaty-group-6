'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {

      student.belongsToMany(models.major, {
        through: 'studentMajors',
        foreignKey: 'studentID'
      });

      models.major.belongsToMany(student, {
        through: 'studentMajors',
        foreignKey: 'majorID'
      });

     

      student.hasMany(models.submission, {
        foreignKey: 'studentID'
      });

      models.submission.belongsTo(student, {
        foreignKey: 'studentID'
      });
    }
  }

  student.init({
    studentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    tawjihiGrade: DataTypes.FLOAT,

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    studyTrack: {
      type: DataTypes.ENUM('علمي', 'ادبي', 'صناعي', 'تجاري', 'شرعي')
    },

    name: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    role: {
      type: DataTypes.ENUM('student', 'admin'),
      defaultValue: 'student'
    }

  }, {
    sequelize,
    modelName: 'student',
  });

  return student;
};