'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('majors', {
      majorID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      acceptanceGrade: {
        type: Sequelize.FLOAT
      },
      creditHours: {
        type: Sequelize.INTEGER
      },
      majorName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      adminID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      costPerHour: {
        type: Sequelize.INTEGER
      },
      studyPlanURL: {
        type: Sequelize.STRING,
        validate: {  // this checks that the input is a URL
          isUrl: true 
        }
      },
      facultyID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'faculties',
          key: 'facultyID'
        },
          onDelete: 'ReSTRICT',
          onUpdate: 'CASCADE',
        allowNull: false
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
    await queryInterface.dropTable('majors');
  }
};