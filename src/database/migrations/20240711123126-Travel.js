'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Travels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      truckId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trucks',
          key: 'id',
          as: 'truckId'
        }
      },
      from: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
          as: 'from'
        }
      },
      to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
          as: 'to'
        }
      },
      notes: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Travels')
  }
}
