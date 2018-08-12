'use strict';
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    addressLine: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    zip: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {});
  Address.associate = function(models) {
    Address.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    })
  };
  return Address;
};