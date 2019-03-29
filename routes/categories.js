const routes = require('express').Router()
const { Food, Category } = require('../models')

routes.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => {
      res.render('pages/categories', { categories })
    })
    .catch(next)
})

routes.get('/add', (req, res, next) => {
  res.render('pages/categories/form')
})

routes.post('/add', (req, res, next) => {
  Category.create({ ...req.body })
    .then(_ => {
      res.redirect('/categories')
    })
    .catch(err => {
      res.render('pages/categories/form', { err })
    })
})

routes.get('/:id/edit', (req, res, next) => {
  Category.findByPk(req.params.id)
    .then(category => res.render('pages/categories/form', { category }))
    .catch(next)
})

routes.post('/:id/edit', (req, res, next) => {
  Category.findByPk(req.params.id)
    .then(category => category.update({ ...req.body }))
    .then(_ => res.redirect('/categories'))
    .catch(err => {
      // check error type !!
      next(err)
    })
})

routes.get('/:id/delete', (req, res, next) => {
  Category.destroy({ where: { ...req.params }})
    .then(_ => res.redirect('/categories'))
    .catch(next)
})

module.exports = routes