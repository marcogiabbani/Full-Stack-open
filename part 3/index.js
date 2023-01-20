
const express = require('express')
const app = express()

let sentences = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2022-1-17T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2022-1-17T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2022-1-17T19:20:14.298Z",
      "important": true
    },
    {
      "content": "hola",
      "date": "2022-12-29T12:59:37.866Z",
      "important": true,
      "id": 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/notes', (request, response) => {
    response.json(sentences)
  })




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)