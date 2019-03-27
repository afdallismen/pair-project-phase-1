const { Food, Category } = require('../models')

Food.findAll()
  .then(foods => console.log(foods.map(f => f.dataValues)))

Food.findOne()
  .then(food => food.getCategory())
  .then(category => console.log(category.dataValues))

Category.findOne()
  .then(category => category.getFood()) // Food already plural ?
  .then(foods => console.log(foods.map(f => f.dataValues)))