//RECORDAR QUE TEST_MONGODB_URI usa 'testNoteApp'
//y que MONGO_URI usa 'notesApp'

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

/**
 * (todavía no subi ningun blog ni nota a la base de
 * datos para los tests)
 */
test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
}, 100000)

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].content).toBe('HTML is esay')
})

afterAll(async () => {
  await mongoose.connection.close()
})

