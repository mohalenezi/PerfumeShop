const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const perfumeRoutes = require("./API/perfume/routes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/perfumes", perfumeRoutes);
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
