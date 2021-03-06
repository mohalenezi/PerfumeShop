const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const perfumeRoutes = require("./API/perfume/routes");
const shopRoutes = require("./API/shop/routes");
const userRoutes = require("./API/user/routes");
const orderRoutes = require("./API/order/routes");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
//database
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// perfume Routes =====
app.use("/perfumes", perfumeRoutes);
app.use("/shops", shopRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.use("/media", express.static("media"));
// Error Handling Middleware =====
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

// Path Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true }); //to be sure the connection is ok between the data and app
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run(); // call the function to make the check
