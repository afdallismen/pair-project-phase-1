const routes = require('express').Router()
const { Food, Category } = require('../models')
const Restaurants = require('../helpers/dummyRestaurants')

routes.get('/', (req, res, next) => {
  Food.findAll({
    include: [Category]
  })
    .then(foods => {
      // dummy
      foods = foods.map(f => {
        f.Restaurant = Restaurants[Math.floor(Math.random() * Restaurants.length)]
        return f
      })
      // dummy

      res.render('pages/foods', { foods })
    })
    .catch(next)
})

routes.get('/add', (req, res, next) => {
  Category.findAll()
    .then(categories => {
      // dummy
      let restaurants = Restaurants.slice()
      // dummy
      let types = ['meal', 'drink'] // Should not be harcoded
      
      res.render('pages/foods/form', { categories, types, restaurants })
    })
    .catch(next)
})

routes.post('/add', (req, res, next) => {
  Food.create({ ...req.body })
    .then(food => {
      res.redirect('/foods')
    })
    .catch(err => {
      res.render('pages/foods/form', { err })
    })
})

routes.get('/:id/edit', (req, res, next) => {
  let food
  Food.findByPk(req.params.id)
    .then(foundFood => {
      food = foundFood
      return Category.findAll()
    })
    .then(categories => {
      // dummy
      let restaurants = Restaurants.slice()
      // dummy

      let types = ['meal', 'drink'] // Should not be harcoded

      res.render('pages/foods/form', { food, categories, restaurants, types }) 
    })
    .catch(next)
})

routes.post('/:id/edit', (req, res, next) => {
  Food.findByPk(req.params.id)
    .then(food => food.update({ ...req.body }))
    .then(_ => res.redirect('/foods'))
    .catch(err => {
      // check error type !!
      next(err)
    })
})

routes.get('/:id/delete', (req, res, next) => {
  Food.destroy({ where: { ...req.params }})
    .then(_ => res.redirect('/foods'))
    .catch(next)
})

module.exports = routes