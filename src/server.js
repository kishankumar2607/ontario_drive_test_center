const express = require("express");
const path = require('path');
const cors = require("cors");
const createError = require("http-errors");
const allRoutes = require("./routes/mainRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// All routes
app.use("/", allRoutes);

// For handling 404 errors
app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

// Error Handler
app.use(async (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
