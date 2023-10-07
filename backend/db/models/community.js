'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Community.belongsTo(
        models.User,
        { as: 'Creator', foreignKey: 'creator_id' }
      );
      Community.belongsToMany(
        models.User,
        { as: 'Members', through: models.Membership, foreignKey: 'community_id', otherKey: 'user_id' }
      );
      Community.hasMany(models.Membership, { foreignKey: "community_id", onDelete: 'CASCADE' });
      Community.hasMany(
        models.Room,
        { foreignKey: 'community_id', otherKey: 'id', onDelete: 'CASCADE' }
      )
    }
  }
  Community.init({
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 80]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 256]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isNumeric: true
      }
  }
  }, {
    sequelize,
    modelName: 'Community',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Community;
};
