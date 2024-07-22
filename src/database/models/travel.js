'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    static associate(models) {
      Travel.belongsTo(models.Truck, {
        foreignKey: 'truckId',
        as: 'truck'
      })
      Travel.belongsTo(models.City, {
        foreignKey: 'from',
      })
      Travel.belongsTo(models.City, {
        foreignKey: 'to',
      })
    }
  }
  Travel.init(
    {
      truckId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      from: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      to: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'Travel'
    }
  )
  return Travel
}
