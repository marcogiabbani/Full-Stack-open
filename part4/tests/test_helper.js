const Note = require('../models/note')
const Blog = require('../models/blog')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const initialBlogs = [
  {
    title: 'Un blog para el test',
    author: 'marqui',
    url: 'jejeje',
    likes: 5
  },
  {
    title: 'El segundo blog',
    author: 'liuca',
    url: 'jojojojoj',
    likes: 1500
  }
]

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: 'Un blog de ejemplo para nonExistingBlogId',
    author: 'marqui',
    url: 'jejeje',
    likes: 5
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb, initialBlogs, nonExistingBlogId,
  blogsInDb
}