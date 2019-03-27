const routes = require('express').Router()

routes.use('/foods', require('./foods'))
routes.use('/categories', require('./categories'))

module.exports = routes