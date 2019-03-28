const express = require('express')
const bodyParser = require('body-parser')
const port = 8000

let app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/user', require('./routes/userRoute'))
app.use('/restaurant', require('./routes/restaurantRoute'))
app.use('/review', require('./routes/reviewRoute'))

app.get('/', (req, res)=>{
    res.render('./index.ejs')
})



app.listen(port,()=>{console.log(`SERVER IS RUNNING IN PORT ${port} . . . `)})