'use strict';
const { faker } = require("@faker-js/faker");
const { User, Story } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    const seederData = [];
    const totalUser = await User.count();
    const totalStory = await Story.count();
    for (let i = 0; i < 40; i++) {
      seederData.push({
        storyId: faker.datatype.number({ min: 1, max: totalStory }),
        content: faker.lorem.sentences(2, '\n'),
        userId: faker.datatype.number({ min: 1, max: totalUser })
      });
    }
    return queryInterface.bulkInsert('Comments', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'Comments';
    return queryInterface.bulkDelete('Comments', null, options);
  }
};
