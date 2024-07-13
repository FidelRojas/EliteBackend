'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Trucks',
      [
        {
          plate: '2448-DTC',
          brand: 'Volvo FH16',
          year: 2005,
          type: 'Camion con chata',
          notes: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trucks', null, {})
  }
}
