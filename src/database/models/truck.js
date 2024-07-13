'use strict'
import bcrypt from 'bcryptjs'

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    static associate(models) {
      Truck.hasMany(models.Travel, {
        foreignKey: 'truckId'
      })
    }
  }
  Truck.init(
    {
      plate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'Truck'
    }
  )

  return Truck
}
