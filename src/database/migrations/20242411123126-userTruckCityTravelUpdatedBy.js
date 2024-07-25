'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'updatedBy', {
        allowNull: false,
        defaultValue: 'DB',
        type: Sequelize.STRING,
      },),

      queryInterface.addColumn('Trucks', 'updatedBy', {
        allowNull: false,
        defaultValue: 'DB',
        type: Sequelize.STRING,
      },),

      queryInterface.addColumn('Cities', 'updatedBy', {
        allowNull: false,
        defaultValue: 'DB',
        type: Sequelize.STRING,
      },)
      ,

      queryInterface.addColumn('Travels', 'updatedBy', {
        allowNull: false,
        defaultValue: 'DB',
        type: Sequelize.STRING,
      },)
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Travels', 'updatedBy'),
      queryInterface.removeColumn('Cities', 'updatedBy'),
      queryInterface.removeColumn('Trucks', 'updatedBy'),
      queryInterface.removeColumn('Users', 'updatedBy'),
    ]);
  }
}
