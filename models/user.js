const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        isEmail: true,
        isLowercase: true,
      }
    },
    password: DataTypes.STRING,
    type: {
      type:DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        user.createdAt = new Date();
        user.updatedAt = new Date();
      },
      beforeUpdate: function (user, options) {
        user.updatedAt = new Date();
      }
    },

  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User;
};