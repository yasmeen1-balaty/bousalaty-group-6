'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      studentID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tawjihiGrade: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0,
          max: 100
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false //very important
      },
      studyTrack: {
        type: Sequelize.ENUM('علمي', 'ادبي', 'صناعي' , 'تجاري' , 'شرعي'),
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.ENUM('student', 'admin'),
        defaultValue: 'student'
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
    await queryInterface.dropTable('students');
  }
};