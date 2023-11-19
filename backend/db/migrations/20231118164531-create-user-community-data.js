'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'UserCommunityData';
    await queryInterface.createTable('UserCommunityData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      community_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Communities',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      message_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      community_rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      funds_spent: {
        type: Sequelize.FLOAT(2),
        allowNull: true
      },
      events_participated: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      last_room: {
        type: Sequelize.INTEGER,
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
      fields: ['user_id', 'community_id'],
      unique: true
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'UserCommunityData';
    return queryInterface.dropTable(options);
  }
};
