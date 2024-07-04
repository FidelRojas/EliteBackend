'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'frojas',
          email: 'fidelrojas@gmail.com',
          password:
            '$2a$10$4oO4mSwNiChWdVKwZJ.d4uYGAKVPQF.AUrfr89m1gJFSuofZztwKy',
          name: 'Fidel',
          lastName: 'Rojas',
          identityCard: '7919108',
          phone: '72202143',
          roleId: 1
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
