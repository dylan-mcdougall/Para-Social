'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(
        models.Community,
        { as: 'Rooms', foreignKey: 'community_id', otherKey: 'id', onDelete: 'CASCADE', hooks: true }
      );
      Room.hasMany(
        models.RoomMessage,
        { as: 'Messages', foreignKey: 'room_id', otherKey: 'id', onDelete: 'CASCADE', hooks: true }
      );
    }
  }
  Room.init({
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
    indexes: [{
      unique: true,
      fields: ['name', 'community_id']
    }]
  });
  return Room;
};
