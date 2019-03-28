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

router.get('/add/:id', (req, res)=>{
    Model.Restaurant.findByPk(req.params.id)
    .then(data=>{
        res.render("pages/review/addReview", {data})
    })
})

router.post('/add/:id', (req, res)=>{
    let dataRestaurant
    Model.Review.create({
        CreatorId: req.session.idLogin,
        RestaurantId: req.params.id,
        rating: req.body.rating,
        description: req.body.description,
    })
    .then(data=>{
        return Model.Restaurant.findByPk(Number(req.params.id))
    })
    .then(data=>{
        dataRestaurant = data
        return Model.Review.findAll({
            include: [Model.User],
            where:{
                RestaurantId: Number(req.params.id)
            },
            order :[['updatedAt','desc']]
        })
    })
    .then(data=>{
        res.render('pages/restaurant/profilRestaurant', {dataRestaurant, data})

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