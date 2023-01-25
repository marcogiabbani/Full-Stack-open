require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const Contact = require("./models/contact");

app.post("/api/contacts", (request, response) => {
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
    .catch((error) => ("Error while trying to save note", error));
});

app.get("/api/contacts/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((contact) => {
      response.json(contact);
    })
    .catch((error) => ("Error while trying to find contact by id", error));
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/contacts", (request, response) => {
  Contact.find({}).then((contact) => {
    response.json(contact);
  });
});

const port = process.env.PORT;
app.listen(port);
console.log(`Server running on port ${port}`);
