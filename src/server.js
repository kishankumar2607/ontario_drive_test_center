const express = require("express");
const session = require('express-session');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const createError = require("http-errors");
const allRoutes = require("./routes/mainRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


// console.log("server js username: " + global.username);

// Configure session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to check if user is authenticated and set session variables in res.locals
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.userId ? true : false;
  res.locals.username = req.session.username || null;
  res.locals.userType = req.session.userType || null;
  next();
});


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