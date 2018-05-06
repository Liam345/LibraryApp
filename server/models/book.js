'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    }, {});

  Book.associate = (models) => {
    Book.belongsToMany(models.Author,{
      through:'BookAuthor',
      as:'authors',
      foreignKey:'bookId',
      onDelete:'SET NULL'
    })
  };
  return Book;
};