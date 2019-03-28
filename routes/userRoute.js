const router = require('express').Router()
const Model = require('../models')
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs')


router.get('/', (req, res)=>{
    Model.User.findAll(
        // {attributes: ['id', 'name', 'username', [Sequelize.fn]]}  //Agregat (count, max, min)
        {
            order : [['id','asc']],
            include : [Model.Restaurant]
    }
    )
    .then(data=>{
        res.render('pages/user/listUser', {data, err:null})
    })
})

router.get('/add', (req, res)=>{
    res.render("pages/user/addUser", {err:null})
})

router.post('/add', (req, res)=>{
    Model.User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })
    .then(data=>{
        // res.render('/')
        res.redirect('/user')
    })
    .catch(err=>{
        res.render('pages/user/addUser', {err:"Email Sudah ada"})
    })
})

router.get('/edit/:id', (req, res)=>{
    Model.User.findByPk(Number(req.params.id))
    .then(data=>{
        res.render('pages/user/editUser', {data})
    })
})

router.post('/edit/:id', (req, res)=>{
    Model.User.findByPk(Number(req.params.id))
    .then(data=>{
        data.name = req.body.name,
        data.username = req.body.username,
        data.password = req.body.password,
        data.updatedAt = new Date
        data.save()
    })
    .then(data=>{
        res.redirect(`/user/${req.params.id}`)
    })
})

router.get('/delete/:id', (req, res)=>{
    Model.User.destroy({ 
        where : {
            id : req.params.id
        }
    })
    .then(data=>{
        res.redirect('/pages/user')
    })
})

router.get('/:id', (req, res)=>{
    Model.User.findByPk(req.params.id, {
        include:[
            {
                model: Model.Restaurant,
                // include: [Model.Restaurant]
            }
        ]})
    .then(data=>{
        // res.send(data)
        res.render('pages/user/profilUser', {data})
    })
})

router.get('/logout/:id', (req, res)=>{
    
    req.session.login = false
    req.session.username = ''
    res.redirect(`/`)
        
})

module.exports = router