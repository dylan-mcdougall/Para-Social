'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.Community,
        { foreignKey: 'imageableId', constraints: false, scope: { imageableType: 'Community' } }
      );
      Image.belongsTo(
        models.User,
        { foreignKey: 'imageableId', constraints: false, scope: { imageableType: 'User' } }
      );
      Image.belongsTo(
        models.RoomMessage,
        { foreignKey: 'imageableId', constraints: false, scope: { imageableType: 'RoomMessage' } }
      );
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['User', 'Community', 'RoomMessage']]
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
