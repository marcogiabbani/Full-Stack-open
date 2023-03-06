const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const notesRouter = require('./controller/notes')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controller/blogs')

mongoose.set('strictQuery', false)

logger.info('Connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)


app.get('/api/ping', (request, response) => {

  return response.send('pong')
    .then(() => {
      logger.info('Sending answer from port:', config.PORT)
    })
    .catch((error) => {
      logger.error(`Error connecting to port ${config.PORT}`, error.message)
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app