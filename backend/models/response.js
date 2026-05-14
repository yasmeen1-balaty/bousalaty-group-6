'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    static associate(models) {
      response.belongsTo(models.submission, { foreignKey: 'submissionID' });
      models.submission.hasMany(response, { foreignKey: 'submissionID' });

      response.belongsTo(models.question, { foreignKey: 'questionID' });
      models.question.hasMany(response, { foreignKey: 'questionID' });

      response.belongsTo(models.option, { foreignKey: 'optionID' });
      models.option.hasMany(response, { foreignKey: 'optionID' });
    }
  }

  response.init({
    responseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    submissionID: {
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