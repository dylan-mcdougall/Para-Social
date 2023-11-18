'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Community,
        { foreignKey: 'creator_id', otherKey: 'id', onDelete: 'CASCADE' }
      );
      User.belongsToMany(
        models.Community,
        { through: models.Membership, foreignKey: 'user_id', otherKey: 'community_id' }
      );
      User.hasMany(
        models.UserCommunityData,
        { foreignKey: 'user_id', otherKey: 'id' }
      );
      User.belongsToMany(
        models.UserCommunityData,
        { foreignKey: 'user_id', otherKey: 'id' }
      );
      User.hasMany(
        models.Membership, 
        { foreignKey: 'user_id', onDelete: 'CASCADE' }
      );
      User.hasMany(
        models.RoomMessage, 
        { foreignKey: 'user_id', otherKey: 'id' }
      );
      User.hasOne(
        models.Image,
        { 
          as: 'ProfileImage', foreignKey: 'imageableId', onDelete: 'CASCADE', 
          hooks: true, constraints: false, scope: { imageableType: 'User' } 
        }
      )
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.")
          }
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.")
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female', 'non-binary', 'other', 'declined']]
      }
    },
    num_communities: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
