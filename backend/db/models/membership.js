'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(
        models.User,
        { foreignKey: 'user_id', otherKey: 'id', onDelete: 'CASCADE', hooks: true }
        );
      Membership.belongsTo(
        models.Community,
        { foreignKey: 'community_id', otherKey: 'id', onDelete:'CASCADE', hooks: true }
        );
    }
  }
  Membership.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
