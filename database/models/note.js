'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT, //More than 255 chars
    category:{
      type: DataTypes.STRING,
      defaultValue: "Unclassified"
    },
    tags: DataTypes.STRING
  }, {});
  //Class method to make the instance needed.
  //models will be an array of the other models
  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: 'UserId'
    });
    //This will add a UserId field to the table
    //That's how it will be accessed.
  };
  return Note;
};
