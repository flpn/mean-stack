const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.send('That\'s all folks')
})

module.exports = app
