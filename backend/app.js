const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postsRouter = require('./routes/posts')

const app = express()

mongoose.connect('mongodb+srv://flpncc:QBuwywAAqlchWKqu@cluster0-vnxki.mongodb.net/mean-tutorial?retryWrites=true')
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.log('Connection failed!'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/posts', postsRouter)

module.exports = app
