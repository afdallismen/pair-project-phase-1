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
    Restaurant.belongsTo(models.User, {foreignKey: 'ownerId'}) //Kepemilikan
    
    Restaurant.hasMany(models.Review, {foreignKey: 'RestaurantId'})

    // Restaurant.belongsTo(models.User, {through: Review, foreignKey: 'RestaurantId'})    //untuk review

  };
  return Restaurant;
};