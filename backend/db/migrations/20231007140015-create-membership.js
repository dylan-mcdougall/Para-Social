'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Memberships'
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
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
      status: {
        type: Sequelize.STRING,
        allowNull: false
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
    options.tableName = 'Memberships';
    return queryInterface.dropTable(options);
  }
};
