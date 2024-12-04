const express = require("express");
const router = express.Router();
const dashboardRoute = require("../routes/dashboardRoutes/dashboardRoutes");
const g2Route = require("../routes/g2Routes/g2Routes");
const gRoute = require("../routes/gRoutes/gRoutes");
const authRoute = require("../routes/authRoutes/authRoutes");
const appointmentRoutes = require("../routes/appointmentRoutes/appointmentRoutes");
const examinerRoutes = require("../routes/examinerRoutes/examinerRoutes");

// Use the routes from each module
router.use(dashboardRoute, g2Route, gRoute, authRoute, appointmentRoutes, examinerRoutes); 

module.exports = router;
