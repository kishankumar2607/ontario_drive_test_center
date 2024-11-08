const express = require('express');
const router = express.Router();
const dashboardController = require("../../controllers/dashboardControllers/dashboardControllers")

// Route to render the dashboard page
router.get("/", dashboardController.getDashboard)

module.exports = router;