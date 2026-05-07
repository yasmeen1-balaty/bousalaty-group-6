'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      //composite key (weak entity)
      resultID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Ensure one result per student
        references: {
          model: 'students',
          key: 'studentID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      resultText: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('results');
  }
};