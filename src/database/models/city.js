'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.Travel, {
        foreignKey: 'from'
      })
      City.hasMany(models.Travel, {
        foreignKey: 'to'
      })
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'City'
    }
  )
  return City
}
