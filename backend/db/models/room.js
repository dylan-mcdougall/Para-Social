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
      // define association here
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
