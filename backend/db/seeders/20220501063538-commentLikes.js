'use strict';
const { faker } = require("@faker-js/faker");
const { User, Comment } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'commentLikes';
    const seederData = [];
    const totalComment = await Comment.count();
    const totalUser = await User.count();
    const totalLikes = faker.datatype.number({ min: 1, max: totalComment * totalUser });
    const uniqueKeys = new Set();
    for (let i = 0; i < totalLikes; i++) {
      let tempUserId = faker.datatype.number({ min: 1, max: totalUser });
      let tempCommentId = faker.datatype.number({ min: 1, max: totalComment });
      let key = `${tempUserId}-${tempCommentId}`;
      while (uniqueKeys.has(key)) {
        tempUserId = faker.datatype.number({ min: 1, max: totalUser });
        tempCommentId = faker.datatype.number({ min: 1, max: totalComment });
        key = `${tempUserId}-${tempCommentId}`;
      }
      uniqueKeys.add(key);
      seederData.push({
        commentId: tempCommentId,
        userId: tempUserId
      });
    }
    return queryInterface.bulkInsert('commentLikes', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'commentLikes';
    return queryInterface.bulkDelete('commentLikes', null, options);
  }
};
