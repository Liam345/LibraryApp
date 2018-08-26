'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bookQuantity: {
        type: Sequelize.JSON,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values:['paid','cancelled','fulfilled','returned'],
        allowNull: false
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      chargeId: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};