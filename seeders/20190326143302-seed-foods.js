'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Foods', Array.from(Array(10), _ => ({
      name: faker.commerce.productName(),
      type: ['meal', 'drink'][Math.floor(Math.random() * 2)],
      createdAt: new Date,
      updatedAt: new Date
    })))
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Foods', null, {})
  }
};
