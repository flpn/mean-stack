const express = require('express')
const multer = require('multer')

const Post = require('../models/post')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error('Invalid mime type')

    if (isValid) {
      error = null
    }

    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().replace(' ', '-')
    const extension = MIME_TYPE_MAP[file.mimetype]

    cb(null, `${name}-${Date.now()}.${extension}`)
  }
})

const router = express.Router()

router.get('', (req, res, next) => {
  const pageSize = +req.query.pageSize
  const currentPage = +req.query.currentPage
  const postQuery = Post.find()
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }

  postQuery
    .then(documents => {
      fetchedPosts = documents
      return Post.countDocuments()
    })
    .then(count => {
      res.status(200).json({
        posts: fetchedPosts,
        maxPosts: count
      })
    })
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(doc => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          title: doc.title,
          content: doc.content,
          imagePath: doc.imagePath
        })
      }
      else {
        res.status(404).json({ message: 'Post not found!' })
      }
    })
})

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${url}/images/${req.file.filename}`
  })

  post.save()
    .then((doc) => {
      res.status(201).json({
        id: doc._id,
        title: doc.title,
        content: doc.content,
        imagePath: doc.imagePath
      })
    })
})

router.put('/:id', multer({ storage: storage }).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}`
    imagePath = `${url}/images/${req.file.filename}`
  }

  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
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
