'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type:DataTypes.STRING,
    },
    lastname: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Author.associate = function(models) {
    Author.belongsToMany(models.Book,{
      through:'BookAuthor',
      as:'books',
      foreignKey:'authorId',
      onDelete:'SET NULL'
    })
  };
  return Author;
};