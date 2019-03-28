'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('meal', 'drink'),
    categoryId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    tableName: 'Foods'
  });
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.Category, { foreignKey: 'categoryId' })
  };
  return Food;
};