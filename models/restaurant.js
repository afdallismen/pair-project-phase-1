'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    openAt: DataTypes.STRING,
    closeAt: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.belongsTo(models.User, {foreignKey: 'ownerId'})
    Restaurant.hasMany(models.Review)
  };
  return Restaurant;
};