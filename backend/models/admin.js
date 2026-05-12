'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin.hasMany(models.faculty, { foreignKey: 'adminID' })
        models.faculty.belongsTo(admin, { foreignKey: 'adminID' })

        admin.hasMany(models.major, { foreignKey: 'adminID' })
        models.major.belongsTo(admin, { foreignKey: 'adminID' })

        admin.hasMany(models.expert, { foreignKey: 'adminID' })
        models.expert.belongsTo(admin, { foreignKey: 'adminID' })
    }
  }
  admin.init({
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('student', 'admin'), defaultValue: 'admin' }
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};