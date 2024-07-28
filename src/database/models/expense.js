'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      })
      Expense.belongsTo(models.Truck, {
        foreignKey: 'truckId',
        as: 'truck'
      })
    }
  }
  Expense.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      from: {
        type: DataTypes.STRING,
      },
      to: {
        type: DataTypes.STRING,
      },
      amountBs: {
        type: DataTypes.DECIMAL(12, 2),
      },
      amountSus: {
        type: DataTypes.DECIMAL(12, 2),
      },
      notes: {
        type: DataTypes.TEXT
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      updatedBy: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: 'Expense'
    }
  )
  return Expense
}
