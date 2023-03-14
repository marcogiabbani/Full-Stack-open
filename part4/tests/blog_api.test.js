const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned in json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  const oneBlog = response.body[0]
  expect(oneBlog.id).toBeDefined()
})

test('making an HTTP POST req increases blogs in DB by one', async () => {
  const blog = new Blog({
    title: 'un post super nuevo',
    author: 'marquii',
    url: 'www.fiff.com',
    likes:545
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes property is missing, default is 0', async () => {
  const blog = new Blog({
    title: 'un post sin la propiedad de likes',
    author: 'marquii',
    url: 'www.fiff.com',
  })

  await api.post('/api/blogs').send(blog)
  const response = await api.get(`/api/blogs/${blog.title}`)
  console.log('response.body.likes', response.body.likes)
  expect(blog.likes).toEqual(0)

})

afterAll(async () => {
  await mongoose.connection.close()
})