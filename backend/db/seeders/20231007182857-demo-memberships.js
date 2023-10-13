'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Membership";
    return queryInterface.bulkInsert(options, [
      {
        user_id: 1,
        community_id: 1,
        status: 'creator'
      }, {
        user_id: 2,
        community_id: 1,
        status: 'member'
      }, {
        user_id: 3,
        community_id: 1,
        status: 'member'
      }, {
        user_id: 1,
        community_id: 2,
        status: 'member'
      }, {
        user_id: 2,
        community_id: 2,
        status: 'creator'
      }, {
        user_id: 3,
        community_id: 2,
        status: 'member'
      }, {
        user_id: 1,
        community_id: 3,
        status: 'pending'
      }, {
        user_id: 2,
        community_id: 3,
        status: 'pending'
      }, {
        user_id: 3,
        community_id: 3,
        status: 'creator'
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
