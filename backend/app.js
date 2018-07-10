const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/posts', (req, res, next) => {
  const post = req.body
  res.status(201).json(post)
})

app.get('/api/posts', (req, res, next) => {
  const dummyPosts = [
    {
      id: 'dfif2io3jr3n2ur',
      title: 'My first dummy post',
      content: 'Blá blá blá'
    },
    {
      id: 'ashf2io3jr3n2ur',
      title: 'My second dummy post',
      content: 'Blé blé blé'
    },
    {
      id: 'htyf2io3jr3n2ur',
      title: 'My third dummy post',
      content: 'Blí blí blí'
    }
  ]

  res.status(200).json(dummyPosts)
})

module.exports = app
