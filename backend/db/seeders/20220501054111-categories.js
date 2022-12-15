'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
    const seederData = [{
      title: "African Cuisine"
    },
    {
      title: "Central African Cuisine"
    },
    {
      title: "East African Cuisine"
    },
    {
      title: "North African Cuisinee"
    },
    {
      title: "Southern African Cuisine"
    },
    {
      title: "West African Cuisine"
    },
    {
      title: "Cuisine of Americas"
    },
    {
      title: "North American Cuisine"
    },
    {
      title: "American Cuisine"
    },
    {
      title: "Central American Cuisine"
    },
    {
      title: "South American Cuisine"
    },
    {
      title: "Caribbean Cuisine"
    },
    {
      title: "Asian Cuisine"
    },
    {
      title: "Central Asian Cuisine"
    },
    {
      title: "East Asian Cuisine"
    },
    {
      title: "South Asian Cuisine"
    },
    {
      title: "Southeast Asian Cuisine"
    },
    {
      title: "West Asian Cuisine"
    },
    {
      title: "European Cuisine"
    },
    {
      title: "Oceanic Cuisine"
    },
    {
      title: "Chinese Cuisine"
    },
    {
      title: "Indian Cuisine"
    },
    {
      title: "Bulgarian Cuisine"
    },
    {
      title: "German Cuisine"
    },
    {
      title: "Eastern European Cuisine"
    },
    {
      title: "French Cuisine"
    },
    {
      title: "Italian Cuisine"
    },
    {
      title: "Thai Cuisine"
    },
    {
      title: "Vietnamese Cuisine"
    },
    ];

    return queryInterface.bulkInsert('Categories', seederData, options);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
    return queryInterface.bulkDelete('Categories', null, options, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
