const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const perfumeRoutes = require("./API/perfume/routes");

//database
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/perfumes", perfumeRoutes);

const run = async () => {
  try {
    await db.sequelize.sync(); //to be sure the connection is ok between the data and app
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run(); // call the function to make the check
