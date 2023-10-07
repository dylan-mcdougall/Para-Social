'use strict';

const { Room } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Room.bulkCreate([
      {
        community_id: 1,
        name: 'Server Chat'
      }, {
        community_id: 1,
        name: 'Degens'
      }, {
        community_id: 1,
        name: 'Tea Time'
      }, {
        community_id: 1,
        name: 'Music'
      }, {
        community_id: 1,
        name: 'Gaming'
      }, {
        community_id: 1,
        name: 'Updates'
      }, {
        community_id: 2,
        name: 'Server Chat'
      }, {
        community_id: 2,
        name: 'Music'
      }, {
        community_id: 2,
        name: 'Gaming'
      }, {
        community_id: 2,
        name: 'Updates'
      }, {
        community_id: 3,
        name: 'Server Chat'
      }, {
        community_id: 3,
        name: 'Updates'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Rooms';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      community_id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
