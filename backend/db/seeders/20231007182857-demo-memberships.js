'use strict';

const { Membership } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Membership.bulkCreate([
      {
        user_id: 1,
        community_id: 1
      }, {
        user_id: 2,
        community_id: 1
      }, {
        user_id: 3,
        community_id: 1
      }, {
        user_id: 1,
        community_id: 2
      }, {
        user_id: 2,
        community_id: 2
      }, {
        user_id: 3,
        community_id: 2
      }, {
        user_id: 1,
        community_id: 3
      }, {
        user_id: 2,
        community_id: 3
      }, {
        user_id: 3,
        community_id: 3
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
