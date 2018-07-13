const express = require('express')

const Post = require('../models/post')

const router = express.Router()

router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json(documents)
    })
})

router.get('/:id', (req, res, next) => {
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

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json(result)
    })
})

module.exports = router
