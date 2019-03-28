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
        res.render('pages/restaurant/listRestaurant', {data})
    })
})

router.get('/add', (req, res)=>{
    res.render("pages/restaurant/addRestaurant")
})

router.post('/add', (req, res)=>{
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
        
        // res.render('restaurant/listRestaurant', {data})
        // res.redirect('/')
    })
    .then(datas=>{
        res.send(datas)
        // res.redirect(`user/${datas.id}`, {datas})

    })
})

router.get('/edit/:id', (req, res)=>{
    Model.Restaurant.findByPk(Number(req.params.id), {include : Model.User})
    .then(data=>{
        res.render('pages/restaurant/editRestaurant', {data})
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
        res.redirect('/pages/restaurant')
    })
})

router.get('/delete/:id', (req, res)=>{
    Model.Restaurant.destroy({ 
        where : {
            id : req.params.id
        }
    })
    .then(data=>{
        res.redirect('./')
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
        // res.send(data)
        // datas = data.slice()
        // data = data.map(element=>{
        //     return element.getUser()
        // })
        // return Promise.all(data)
        // .then(user=>{
            // res.send(data)
        res.render('pages/restaurant/profilRestaurant', {dataRestaurant, data})
        // res.send(user)
    // })

    })
})

module.exports = router
