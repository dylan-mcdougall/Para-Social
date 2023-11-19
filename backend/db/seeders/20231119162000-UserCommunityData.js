'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "UserCommunityData"
    return queryInterface.bulkInsert(options, [
      {
        user_id: 1,
        community_id: 1,
        message_count: 6,
        community_rank: 1,
        funds_spent: null,
        events_participated: null,
        last_room: 7
      },
      {
        user_id: 2,
        community_id: 1,
        message_count: 5,
        community_rank: 1,
        funds_spent: null,
        events_participated: null,
        last_room: 7
      },
      {
        user_id: 3,
        community_id: 1,
        message_count: 1,
        community_rank: 1,
        funds_spent: null,
        events_participated: null,
        last_room: 7
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserCommunityData';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
