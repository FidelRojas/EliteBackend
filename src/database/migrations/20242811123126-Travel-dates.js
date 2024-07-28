'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Travels', 'departureDate', {
        type: Sequelize.DATE,
      },),

      queryInterface.addColumn('Travels', 'arrivalDate', {
        type: Sequelize.DATE,
      },),
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Travels', 'arrivalDate'),
      queryInterface.removeColumn('Travels', 'departureDate'),
    ]);
  }
}
