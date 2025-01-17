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
        targetKey: 'id',
        as: 'fromCity'


      })
      Travel.belongsTo(models.City, {
        foreignKey: 'to',
        targetKey: 'id',
        as: 'toCity'
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
        type: DataTypes.TEXT
      },
      updatedBy: {
        type: DataTypes.STRING
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
