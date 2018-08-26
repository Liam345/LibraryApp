'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    bookQuantity: {
      type:DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    status:{
      type:DataTypes.ENUM,
      values:['paid','cancelled','fulfilled','returned'],
      allowNull: false,
    },
    addressId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    chargeId:  {
      type:DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete:'CASCADE'
    })
    // associations can be defined here
  };
  return Order;
};

