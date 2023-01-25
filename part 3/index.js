
require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

const Note = require('./models/note')




app.post('/api/notes', (request, response) => {
  const body = request.body
  console.log(request.body)

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json({savedNote})
  })
  .catch((error) => ('Error while trying to save note', error))
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
  .catch((error) => ('Error while trying to find note by id', error))
})



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })




const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)