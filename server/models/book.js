'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type:DataTypes.STRING,
      allowNull: false,
    }
    }, {});

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};