const router = require('express').Router()
const Model = require('../models')
const Sequelize = require('sequelize');


router.get('/', (req, res)=>{
    Model.User.findAll(
        // {attributes: ['id', 'name', 'username', [Sequelize.fn]]}  //Agregat (count, max, min)
        {
            order : [['id','asc']],
            include : [Model.Restaurant]
    }
    )
    .then(data=>{
        res.render('user/listUser', {data, err:null})
    })
})

router.get('/add', (req, res)=>{
    res.render("user/addUser", {err:null})
})

router.post('/add', (req, res)=>{
    Model.User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })
    .then(data=>{
        res.redirect('/user')
    })
    .catch(err=>{
        res.render('user/addUser', {err:"Email Sudah ada"})
    })
})

router.get('/edit/:id', (req, res)=>{
    Model.User.findByPk(Number(req.params.id))
    .then(data=>{
        res.render('user/editUser', {data})
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
        res.redirect('/user')
    })
})

router.get('/delete/:id', (req, res)=>{
    Model.User.destroy({ 
        where : {
            id : req.params.id
        }
    })
    .then(data=>{
        res.redirect('/user')
    })
})
module.exports = router