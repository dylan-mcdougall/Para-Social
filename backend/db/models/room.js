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
        { as: 'Rooms', foreignKey: 'community_id', otherKey: 'id' }
      );
      Room.hasMany(
        models.RoomMessage,
        { as: 'Messages', foreignKey: 'room_id', otherKey: 'id', onDelete: 'CASCADE' }
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
    }, 
    classification: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Room',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    indexes: [{
      unique: true,
      fields: ['name', 'community_id']
    }]
  });
  return Room;
};
