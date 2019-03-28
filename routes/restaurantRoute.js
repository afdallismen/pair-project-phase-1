const router = require('express').Router()
const Model = require('../models')

router.get('/', (req, res)=>{
    Model.Restaurant.findAll(
        // {attributes: ['id', 'name', 'username', [Sequelize.fn]]}  //Agregat (count, max, min)
        {
            order : [['id','asc']],
            include : [Model.User]
    }
    )
    .then(data=>{
        res.render('restaurant/listRestaurant', {data})
    })
})

router.get('/add', (req, res)=>{
    res.render("restaurant/addRestaurant")
})

router.post('/add', (req, res)=>{
    Model.Restaurant.create({
        name: req.body.name,
        ownerId: req.body.ownerId,
        address: req.body.address,
        openAt: req.body.openAt,
        closeAt: req.body.closeAt
    })
    .then(data=>{
        res.redirect("./")

        // res.render('restaurant/listRestaurant', {data})
        // res.redirect('/')
    })
})

router.get('/edit/:id', (req, res)=>{
    Model.Restaurant.findByPk(Number(req.params.id), {include : Model.User})
    .then(data=>{
        res.render('restaurant/editRestaurant', {data})
    })
})

router.post('/edit/:id', (req, res)=>{
    Model.Restaurant.findByPk(Number(req.params.id))
    .then(data=>{
        data.name= req.body.name,
        data.address= req.body.address,
        data.openAt= req.body.openAt,
        data.closeAt= req.body.closeAt,
        data.updatedAt = new Date
        data.save()
    })
    .then(data=>{
        res.redirect('/restaurant')
    })
})

router.get('/delete/:id', (req, res)=>{
    Model.Restaurant.destroy({ 
        where : {
            id : req.params.id
        }
    })
    .then(data=>{
        res.redirect('/restaurant')
    })
})

module.exports = router
