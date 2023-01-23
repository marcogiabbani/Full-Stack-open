const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://fullstack:${password}@cluster0.dw5dejb.mongodb.net/noteApp?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length > 4) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");
      const contact = new Contact({
        name: name,
        number: number,
      });
      return contact.save();
    })
    .then(() => {
      console.log(`Added ${name} number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else {
  console.log("entre a tercera opcion");
  mongoose.connect(url).then((result) => {
    Contact.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      return mongoose.connection.close();
    });
  });
}
