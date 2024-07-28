'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: 'Category'
    }
  )
  return Category
}
