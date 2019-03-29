const express = require('express')
const routes = require('./routes')
const session = require('express-session')
const isLogin = require('./middleware/login')
const Model = require('./models')
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs')
const Op = Sequelize.Op


const app = express()
const PORT = 3000

app.locals.isLogin = isLogin

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.static('public'))
app.use('/', routes)

app.use(session({
    secret : "login"
}))


app.post('/signup', (req, res)=>{
    Model.User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })
    .then(data=>{
        res.redirect('/')
    })
    .catch(err=>{
        res.render('signup', {err:"Username Sudah ada"})
    })
})

app.get('/user/logout/:id', (req, res)=>{
    
    req.session.login = false
    req.session.username = ''
    app.locals.login = false
    app.locals.username = null
    app.locals.idLogin = null
    res.redirect(`/`)
        
})


app.use('/user', isLogin , require('./routes/userRoute'))
app.use('/restaurant', require('./routes/restaurantRoute'))
app.use('/review', isLogin , require('./routes/reviewRoute'))

// app.use('/user',  require('./routes/userRoute'))
// app.use('/restaurant', require('./routes/restaurantRoute'))
// app.use('/review', require('./routes/reviewRoute'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/search', (req, res)=>{
    Model.Restaurant.findAll({where : { name : {[Op.iLike]: `%${req.query.search}%`} }})
    .then(data=>{
        res.render('search', {data})
        // res.send(data)
    })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', (req, res)=>{
    Model.User.findOne({
        where:{
            username: req.body.username
        }
    })
    .then(data=>{
        let check = bcrypt.compareSync(req.body.password, data.password)

        if (check) {
            req.session.login = true
            req.session.username = data.username
            req.session.idLogin = data.id
            app.locals.idLogin = data.id
            app.locals.login = true
            app.locals.username = data.username
            res.redirect(`/user/${data.id}`)
        } else {
            res.redirect('login')
        }
    })
})

app.listen(PORT, _ => {
  console.log('Listening in port %i...', PORT)
})
