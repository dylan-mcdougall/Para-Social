'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Images"
    return queryInterface.bulkInsert(options, [
      {
        url: "https://aaprojectbucket.s3.us-west-1.amazonaws.com/f29e4d21805896f916e03fd969ca0575fe368d1da3cef088fb3ec2eea82e150e",
        name: "f29e4d21805896f916e03fd969ca0575fe368d1da3cef088fb3ec2eea82e150e",
        imageableId: 6,
        imageableType: 'RoomMessage'
      }, {
        url: "https://aaprojectbucket.s3.us-west-1.amazonaws.com/9553efb6f6a0a6ffa3873f679eeeee55fd1d805c266c55d6052d5e2dc2bdc5af.gif",
        name: "9553efb6f6a0a6ffa3873f679eeeee55fd1d805c266c55d6052d5e2dc2bdc5af.gif",
        imageableId: 9,
        imageableType: "RoomMessage"
      }, {
        url: "https://aaprojectbucket.s3.us-west-1.amazonaws.com/b7cdc9d4b6b8a85e7da222c03c41ecd2e6b11944d05562199b0f0d504835ac92",
        name: "b7cdc9d4b6b8a85e7da222c03c41ecd2e6b11944d05562199b0f0d504835ac92",
        imageableId: 10,
        imageableType: "RoomMessage"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableId: { [Op.in]: [6, 9, 10] }
    }, {});
  }
};
