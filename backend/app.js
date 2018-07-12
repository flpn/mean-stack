const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express()

mongoose.connect('mongodb+srv://flpncc:QBuwywAAqlchWKqu@cluster0-vnxki.mongodb.net/mean-tutorial?retryWrites=true')
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.log('Connection failed!'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save()
    .then((doc) => {
      console.log(doc)
      res.status(201).json(doc)
    })
})

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json(documents)
    })
})

module.exports = app
