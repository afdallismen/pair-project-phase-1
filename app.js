const express = require('express')
const routes = require('./routes')
const session = require('express-session')
const isLogin = require('./middleware/login')
const Model = require('./models')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use('/', routes)

app.use(session({
    secret : "login"
}))


app.use('/user', isLogin , require('./routes/userRoute'))
app.use('/restaurant', isLogin , require('./routes/restaurantRoute'))
app.use('/review', isLogin , require('./routes/reviewRoute'))

// app.use('/user',  require('./routes/userRoute'))
// app.use('/restaurant', require('./routes/restaurantRoute'))
// app.use('/review', require('./routes/reviewRoute'))

app.get('/', (req, res)=>{
    res.render('index')
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

        if(check){
            req.session.login = true,
            req.session.username = data.username,
            req.session.idLogin = data.id
            res.redirect(`/user/${data.id}`)
        }else{
            res.redirect('login')
        }
    })
})

app.listen(PORT, _ => {
  console.log('Listening in port %i...', PORT)
})
