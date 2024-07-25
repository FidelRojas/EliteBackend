'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Trucks', 'notes', {
        type: Sequelize.TEXT,
      },),

      queryInterface.changeColumn('Travels', 'notes', {
        type: Sequelize.TEXT,
      },)
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Trucks', 'notes', {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn('Travels', 'updatedBy',
        {
          type: Sequelize.STRING,
        }
      ),
    ]);
  }
}
