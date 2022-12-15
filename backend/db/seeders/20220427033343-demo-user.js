'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require("@faker-js/faker");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const seederData = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        about: faker.lorem.sentences(2, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        about: faker.lorem.sentences(3, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        about: faker.lorem.sentences(1, '\n'),
        profileImage: faker.image.people(200, 200, true)
      },

    ];
    for (let i = 0; i < 15; i++) {
      seederData.push({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync('password4'),
        about: faker.lorem.sentences(3, '\n'),
        profileImage: faker.image.people(200, 200, true)
      });
    }
    return queryInterface.bulkInsert('Users', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete('Users', null, options, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
