const express = require("express");
const perfumes = require("./products");
const cors = require("cors"); // yarn add cors

const app = express();

// Middleware
app.use(cors());

// Routes
app.get("/perfumes", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(perfumes);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
