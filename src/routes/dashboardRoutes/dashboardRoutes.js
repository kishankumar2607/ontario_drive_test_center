const express = require('express');
const router = express.Router();
const dashboardController = require("../../controllers/dashboardControllers/dashboardControllers")

router.get("/", dashboardController.getDashboard)

module.exports = router;