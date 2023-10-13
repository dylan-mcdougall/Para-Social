'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Communities";
    return queryInterface.bulkInsert(options, [
      {
        creator_id: 1,
        name: 'Demo Community',
        description: 
        `Come join and interact with all of your favorite
        people, and creators. Features include but are not limited to
        messaging, sending images, sharing videos.`,
        private: false,
        price: 0
      },
      {
        creator_id: 2,
        name: 'Another Fake Community',
        description:
        `WOW! Look at that, another fake community for the sake of building
        a robust looking application. Nifty. Cool. V Interesting.`,
        private: false,
        price: 10.50
      }, {
        creator_id: 3,
        name: 'Yet Another Fake Community. Shocker.',
        description:
        `Cmon man, why are you even reading these? A bit cringe of you to
        put me under this much scrutiny that you'd read the THIRD fake description smh.`,
        private: true,
        price: 9.99
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Communities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Demo Community', 'Another Fake Community', 'Yet Another Fake Community. Shocker.'] }
    }, {});
  }
};
