const express = require("express");
const router = express.Router();

const LoginPage = require("../../controllers/loginControllers/loginControllers")

// Route to render the login page
router.get("/login", LoginPage.renderLoginPage);

module.exports = router;
