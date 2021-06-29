const express = require("express");
let perfumes = require("./products");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//////////// Routes ////////////

//// list ////
app.get("/perfumes", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(perfumes);
});

//// delete ////
app.delete("/perfumes/:perfumeId", (req, res) => {
  const { perfumeId } = req.params;
  const foundPerfume = perfumes.find((perfume) => perfume.id === +perfumeId);
  if (foundPerfume) {
    perfumes = perfumes.filter((perfume) => perfume.id !== +perfumeId);
    res.status(204).end(); //to tell no content and end response
  } else {
    //if the id was not in the identified list this message will appear
    res.status(404).json({ message: "Perfume Not Found." });
  }
});

//// create ////
app.post("/perfumes", (req, res) => {
  const id = perfumes.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newPerfume = {
    id,
    slug,
    ...req.body,
  };
  perfumes.push(newPerfume);
  res.status(201).json(newPerfume); // response end with created perfume
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
