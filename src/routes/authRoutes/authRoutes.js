const express = require("express");
const router = express.Router();
const authController = require('../../controllers/authController/authController');

// Render the Login pages
router.get("/login", authController.renderLoginPage);

// Render the Signup page
router.get("/register", authController.renderSignupPage);

// Signup Routes
router.post('/register', authController.signup);

// Login Route
router.post('/login', authController.login);

// Logout Route
router.get('/logout', authController.logout);

module.exports = router;
