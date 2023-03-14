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
  const blog = new Blog({ body })
  try {
    const savedNote = await blog.save()
    response.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter