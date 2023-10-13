'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoomMessage.belongsTo(
        models.Room,
        { foreignKey: 'room_id', otherKey: 'id' }
      );
      RoomMessage.belongsTo(
        models.User,
        { foreignKey: 'user_id', otherKey: 'id' }
      )
    }
  }
  RoomMessage.init({
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['text', 'src']]
      }
    },
    content_message: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 300]
      }
    },
    content_src: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content_src_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'RoomMessage',
  });
  return RoomMessage;
};
