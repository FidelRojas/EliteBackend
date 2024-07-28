'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      amountBs: {
        type: Sequelize.DECIMAL(12, 2),
      },
      amountSus: {
        type: Sequelize.DECIMAL(12, 2),
      },
      notes: {
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        }
      },
      truckId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trucks',
          key: 'id',
          as: 'truckId'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      updatedBy: {
        allowNull: false,
        type: Sequelize.STRING,
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
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Expenses')
  }
}
