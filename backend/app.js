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

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json(documents)
    })
})

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(doc => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          title: doc.title,
          content: doc.content
        })
      }
      else {
        res.status(404).json({ message: 'Post not found!' })
      }
    })
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save()
    .then((doc) => {
      res.status(201).json({
        id: doc._id,
        title: doc.title,
        content: doc.content
      })
    })
})

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  })

  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      res.status(200).json(result)
    })
})

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json(result)
    })
})

module.exports = app
