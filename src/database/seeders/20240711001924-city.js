'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Cities',
      [
        {
          name: 'Cochabamba',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Arica',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Santa Cruz',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iqique',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {})
  }
}
