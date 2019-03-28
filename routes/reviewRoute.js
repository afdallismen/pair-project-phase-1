const router = require('express').Router()
const Model = require('../models')


router.get('/', (req, res)=>{
    Model.Restaurant.findAll(
        // {attributes: ['id', 'name', 'username', [Sequelize.fn]]}  //Agregat (count, max, min)
        {
            order : [['id','asc']],
            include : [Model.Review, Model.User]
    })
    .then(data=>{
        res.send(data)
        // res.render('review/listReview', {data, err:null})
    })
})

router.get('/add', (req, res)=>{
    res.render("pages/review/addReview", {err:null})
})

router.post('/add', (req, res)=>{
    Model.Review.create({
        CreatorId: req.body.creatorId,
        RestaurantId: req.body.restaurantId,
        rating: req.body.rating,
        description: req.body.description,
    })
    .then(data=>{
        res.redirect('/pages/review/add')
    })
    .catch(err=>{
        // res.render('restaurant/addRestaurant')
    })
})

router.get('/edit/:id', (req, res)=>{
    Model.Review.findByPk(Number(req.params.id))
    .then(data=>{
        res.render('pages/review/editReview', {data})
    })
})

router.post('/edit/:id', (req, res)=>{
    Model.Review.findByPk(Number(req.params.id))
    .then(data=>{
        data.RestaurantId= req.body.restaurantId,
        data.rating= req.body.rating,
        data.description= req.body.description,
        data.updatedAt = new Date
        data.save()
    })
    .then(data=>{
        res.redirect('/pages/review')
    })
})

router.get('/delete/:id', (req, res)=>{
    Model.Review.destroy({ 
        where : {
            id : req.params.id
        }
    })
    .then(data=>{
        res.redirect('/pages/review')
    })
})
module.exports = router