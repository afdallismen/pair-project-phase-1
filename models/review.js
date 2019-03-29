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
    Review.belongsTo(models.User, {foreignKey: 'CreatorId' })
    Review.belongsTo(models.Review, {foreignKey: 'RestaurantId' })
  };
  return Review;
};