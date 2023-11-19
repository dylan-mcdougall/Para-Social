'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "RoomMessages"
    return queryInterface.bulkInsert(options, [
      {
        room_id: 1,
        user_id: 1,
        content_type: 'text',
        content_message: 'Wow! You found the first message. Cool. Anyways...'
      }, {
        room_id: 1,
        user_id: 1,
        content_type: 'text',
        content_message: 'It sure is lonely in here.'
      }, {
        room_id: 1,
        user_id: 2,
        content_type: 'text',
        content_message: 'Hey friend! No one asked! :)'
      }, {
        room_id: 6,
        user_id: 2,
        content_type: 'text',
        content_message: 'I hope I guessed correctly that this is the Update Chat from the bulk seed :]'
      }, {
        room_id: 6,
        user_id: 1,
        content_type: 'text',
        content_message: 'Would be real cool if we could implement images or videos huh...'
      }, {
        room_id: 6,
        user_id: 2,
        content_type: 'src'
      }, {
        room_id: 7,
        user_id: 1,
        content_type: 'text',
        content_message: 'Welcome to the testing ground for any src attribute being passed into the database! Not that you care ofc, I just need enough seed data.'
      }, {
        room_id: 7,
        user_id: 3,
        content_type: 'text',
        content_message: `Now let's see if we can get a gif in here.`
      }, {
        room_id: 7,
        user_id: 2,
        content_type: 'src'
      }, {
        room_id: 7,
        user_id: 1,
        content_type: 'text',
        content_message: 'How about a video?'
      }, {
        room_id: 7,
        user_id: 2,
        content_type: 'src'
      }, {
        room_id: 7,
        user_id: 1,
        content_type: 'src',
        content_message: 'Sure would be cool if I could send a message while sharing a clip or image.'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RoomMessages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
