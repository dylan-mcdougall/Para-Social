'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      { 
        first_name: "Demo",
        last_name: 'Boi jr.',
        email: 'demo@user.io',
        username: 'Demo-lition',
        d_o_b: '1990-05-14',
        sex: 'male',
        hashedPassword: bcrypt.hashSync('password')
      },
      { 
        first_name: "Frank",
        last_name: "Fronk",
        email: 'user1@user.io',
        username: 'FakeUser1',
        d_o_b: '2000-01-18',
        sex: 'non-binary',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        first_name: "Meep",
        last_name: "Moop",
        email: 'user2@user.io',
        username: 'FakeUser2',
        d_o_b: '1995-10-12',
        sex: 'female',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
