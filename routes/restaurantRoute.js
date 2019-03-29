const router = require('express').Router()
const Model = require('../models')
const isLogin = require('../middleware/login')


router.get('/', (req, res)=>{
    Model.Restaurant.findAll(
        // {attributes: ['id', 'name', 'username', [Sequelize.fn]]}  //Agregat (count, max, min)
        {
            order : [['id','asc']],
            include : [Model.User]
    }
    )
    .then(data=>{
        res.render('pages/restaurant/listRestaurant', {data})
    })
})

router.get('/add/:id', isLogin, (req, res)=>{
    res.render("pages/restaurant/addRestaurant")
})

router.post('/add/:id', isLogin, (req, res)=>{
    Model.Restaurant.create({
        name: req.body.name,
        ownerId: req.session.idLogin,
        address: req.body.address,
        openAt: req.body.openAt,
        closeAt: req.body.closeAt
    })
    .then(data=>{
        return Model.User.findByPk(req.params.id, {
            include:[
                Model.Restaurant

                // {
                //     model: Model.Restaurant,
                    // include: [Model.Restaurant]
                // }
            ]})
    })
    .then(data=>{
        res.render('pages/user/profilUser',  {data})

    })
})

router.get('/edit/:id', isLogin, (req, res)=>{
    let id = req.params.id.split('&')

    Model.Restaurant.findByPk(id[0], {include : Model.User})
    .then(data=>{
        res.render('pages/restaurant/editRestaurant', {data})
    })
})

router.post('/edit/:id', isLogin, (req, res)=>{
    let id = req.params.id.split('&')

    Model.Restaurant.findByPk(id[0])
    .then(data=>{
        data.name= req.body.name,
        data.address= req.body.address,
        data.openAt= req.body.openAt,
        data.closeAt= req.body.closeAt,
        data.updatedAt = new Date
        return data.save()
    })
    .then(datas=>{
        return Model.User.findByPk(id[1], {
            include:[
                {
                    model: Model.Restaurant,
                    // include: [Model.Restaurant]
                }
            ]})
    })
    .then(data=>{
        // res.redirect('user', {data})

        res.render('pages/user/profilUser', {data})
    })
})

router.get('/delete/:id', isLogin, (req, res)=>{
    let id = req.params.id.split('&')
    Model.Restaurant.destroy({ 
        where : {
            id : id[0]
        }
    })
    .then(datas=>{
        return Model.User.findByPk(id[1], {
            include:[
                {
                    model: Model.Restaurant,
                    // include: [Model.Restaurant]
                }
            ]})
    })
    .then(data=>{
        res.render('pages/user/profilUser', {data})
    })
})


router.get('/:id', (req, res)=>{
    let dataRestaurant
    Model.Restaurant.findByPk(Number(req.params.id))
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
})

module.exports = router
