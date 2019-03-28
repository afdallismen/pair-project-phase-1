'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    CreatorId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    models.Restaurant.belongsToMany(models.User, {through: Review})
    models.User.belongsToMany(models.Restaurant, {through: Review, foreignKey: 'CreatorId' })
  };
  return Review;
};