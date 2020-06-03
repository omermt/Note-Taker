'use strict';
module.exports = (sequelize, DataTypes) => {
  //User will be the name for this model
  const User = sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING, //Optional, can be null.
    last_login: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW //Auto fill this val when created
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Note, {
      as: 'Notes'
    });
  };

  return User;
};

//Missing the associations (notes)
