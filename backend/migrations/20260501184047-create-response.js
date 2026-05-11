'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('responses', {
      responseID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false ,
        primaryKey: true
      },

      studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'studentID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      questionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'questionID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      optionID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'options',
          key: 'optionID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('responses');
  }
};