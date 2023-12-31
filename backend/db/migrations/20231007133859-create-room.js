'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}
options.tableName = 'Rooms';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      community_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Communities',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      classification: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);

    await queryInterface.addIndex(options, {
      fields: ['name', 'community_id'],
      unique: true
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Rooms';
    return queryInterface.dropTable(options);
  }
};
