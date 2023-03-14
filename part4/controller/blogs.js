const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try {
    const savedNote = await blog.save()
    response.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
})

blogsRouter.get('/:title', async (request, response, next) => {
  console.log('el parametro de busqueda resquest.prams.title es', request.params.title)
  try {
    const blog = await Blog.find({ title: request.params.title })
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter