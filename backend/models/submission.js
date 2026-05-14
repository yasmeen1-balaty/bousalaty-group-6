'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class submission extends Model {

    static associate(models) {

      submission.belongsTo(models.student, {
        foreignKey: 'studentID'
      });

      models.student.hasMany(submission, {
        foreignKey: 'studentID'
      });

      submission.hasMany(models.response, {
        foreignKey: 'submissionID'
      });
      models.response.belongsTo(submission, {
        foreignKey: 'submissionID'
      });

    }

  }

  submission.init({

    submissionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    aiResult: {
      type: DataTypes.JSON,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending'
    }

  }, {

    sequelize,
    modelName: 'submission',

  });

  return submission;
};