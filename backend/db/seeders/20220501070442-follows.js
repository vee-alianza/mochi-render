'use strict';
const { faker } = require("@faker-js/faker");
const { User } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Follows';
    const seederData = [];
    const totalUser = await User.count();
    const totalFollowers = faker.datatype.number({ min: 1, max: (totalUser * totalUser) - totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalFollowers; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempFollowerId = faker.datatype.number({ min: 1, max: totalUser });
      let key = `${tempUserId}-${tempFollowerId}`;
      while (uniqueKeys.has(key) || tempUserId === tempFollowerId) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempFollowerId = faker.datatype.number({ min: 1, max: totalUser });
        key = `${tempUserId}-${tempFollowerId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        followerId: tempFollowerId,
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('Follows', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'Follows';
    return queryInterface.bulkDelete('Follows', null, options);
  }
};
