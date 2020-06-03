'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        user_name: "Omer",
        password: "123456Omer",
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        last_login: new Date().toDateString()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
