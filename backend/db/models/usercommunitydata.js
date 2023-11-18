'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCommunityData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCommunityData.belongsToMany(
        models.User,
        { foreignKey: 'user_id', otherKey: 'id', onDelete: 'CASCADE' }
      );
      UserCommunityData.belongsToMany(
        models.Community,
        { foreignKey: 'community_id', otherKey: 'id', onDelete: 'CASCADE' }
      );
      UserCommunityData.hasMany(
        models.User,
        { foreignKey: 'user_id' }
      );
      UserCommunityData.hasMany(
        models.Community,
        { foreignKey: 'community_id' }
      )
    }
  }
  UserCommunityData.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    community_rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    funds_spent: {
      type: DataTypes.FLOAT(2),
      allowNull: true
    },
    events_participated: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_room: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserCommunityData',
  });
  return UserCommunityData;
};
