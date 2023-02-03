require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const Note = require("./models/note");

app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  console.log(request.body);

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json({ savedNote });
    })
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.get("/", (request, response, next) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response, next) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
const port = process.env.PORT;
app.listen(port);
console.log(`Server running on port ${port}`);
