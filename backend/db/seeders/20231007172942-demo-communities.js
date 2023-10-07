'use strict';

const { Community } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Community.bulkCreate([
      {
        creator_id: 1,
        name: 'Demo Community',
        description: 
        `Come join and interact with all of your favorite
        people, and creators. Features include but are not limited to
        messaging, sending images, sharing videos.`,
        private: false,
        price: 0
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Communities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Demo Community'] }
    }, {});
  }
};
