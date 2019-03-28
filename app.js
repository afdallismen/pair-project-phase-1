const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use('/', routes)

app.use('/user', require('./routes/userRoute'))
app.use('/restaurant', require('./routes/restaurantRoute'))
app.use('/review', require('./routes/reviewRoute'))


app.listen(PORT, _ => {
  console.log('Listening in port %i...', PORT)
})
