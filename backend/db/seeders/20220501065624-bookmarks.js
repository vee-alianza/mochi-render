'use strict';
const { faker } = require("@faker-js/faker");
const { User, Story } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookmarks';
    const seederData = [];
    const totalStory = await Story.count();
    const totalUser = await User.count();
    const totalBookmarks = faker.datatype.number({ min: 1, max: totalStory * totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalBookmarks; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempStoryId = faker.datatype.number({ min: 1, max: totalStory });
      let key = `${tempUserId}-${tempStoryId}`;
      while (uniqueKeys.has(key)) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempStoryId = faker.datatype.number({ min: 1, max: totalStory });
        key = `${tempUserId}-${tempStoryId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        storyId: tempStoryId,
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('Bookmarks', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'Bookmarks';
    return queryInterface.bulkDelete('Bookmarks', null, options);
  }
};
