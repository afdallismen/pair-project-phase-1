'use strict';

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
   return queryInterface.bulkInsert('Restaurants', [{
    name: "Pondok Bebek",
    ownerId: 1,
    address: "Pondok Indah, Jakarta Selatan",
    openAt: "09:00",
    closeAt: "21:00",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Ayam kebakar",
    ownerId: 2,
    address: "Joglo, Jakarta Barat",
    openAt: "11:00",
    closeAt: "22:00",
    createdAt: new Date,
    updatedAt: new Date
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Restaurants', null, {});

  }
};
