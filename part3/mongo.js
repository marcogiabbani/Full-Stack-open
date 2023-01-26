require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const Contact = require("./models/contact");

app.post("/api/contacts", (request, response, next) => {
  const body = request.body;
  console.log(request.body);

  if (body.name === undefined) {
    return response.status(400).json({ error: "body info is missing" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((savedConstact) => {
      response.json({ savedConstact });
    })
    .catch(error => next(error))
});

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get("/api/contacts", (request, response, next) => {
  Contact.find({}).then((contact) => {
    response.json(contact);
  });
});

app.get("/api/contacts/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      response.json(contact);
    })
    .catch(error => next(error))
});


app.get("/", (request, response, next) => {
  response.send("<h1>Hello World!</h1>");
});


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}



app.use(errorHandler)

const port = process.env.PORT;
app.listen(port);
console.log(`Server running on port ${port}`);
