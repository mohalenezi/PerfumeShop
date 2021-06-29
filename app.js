const express = require("express");
let perfumes = require("./products");
const cors = require("cors"); // yarn add cors

const app = express();

// Middleware
app.use(cors());

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

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
