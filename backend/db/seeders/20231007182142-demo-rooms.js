'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Rooms";
    return queryInterface.bulkInsert(options, [
      {
        community_id: 1,
        name: 'Server Chat',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'Degens',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'Tea Time',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'Music',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'Gaming',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'Updates',
        classification: 'text'
      }, {
        community_id: 1,
        name: 'About and Rules',
        classification: 'about'
      }, {
        community_id: 1,
        name: 'Announcements',
        classification: 'announcement'
      }, {
        community_id: 2,
        name: 'Server Chat',
        classification: 'text'
      }, {
        community_id: 2,
        name: 'Music',
        classification: 'text'
      }, {
        community_id: 2,
        name: 'Gaming',
        classification: 'text'
      }, {
        community_id: 2,
        name: 'Updates',
        classification: 'text'
      }, {
        community_id: 2,
        name: 'About and Rules',
        classification: 'about'
      }, {
        community_id: 2,
        name: 'Announcements',
        classification: 'announcement'
      }, {
        community_id: 3,
        name: 'Server Chat',
        classification: 'text'
      }, {
        community_id: 3,
        name: 'Updates',
        classification: 'text'
      }, {
        community_id: 3,
        name: 'About and Rules',
        classification: 'about'
      }, {
        community_id: 3,
        name: 'Announcements',
        classification: 'announcement'
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
