const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')

const app = express()

mongoose.connect('mongodb+srv://flpncc:QBuwywAAqlchWKqu@cluster0-vnxki.mongodb.net/mean-tutorial?retryWrites=true')
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.log('Connection failed!'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/images', express.static(path.join('backend/images')))

app.use('/api/posts', postsRouter)
app.use('/api/user', userRouter)

module.exports = app
