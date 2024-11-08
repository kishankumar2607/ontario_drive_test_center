const express = require("express");
const router = express.Router();
const dashboardRoute = require("../routes/dashboardRoutes/dashboardRoutes");
const g2Route = require("../routes/g2Routes/g2Routes");
const gRoute = require("../routes/gRoutes/gRoutes");
const authRoute = require("../routes/authRoutes/authRoutes");
const userRoute = require("../routes/userDataRoutes/userDataRoutes");
const userUpdateRoute = require("../routes/updateUserRoutes/updateUserRoutes")

// Use the routes from each module
router.use(dashboardRoute, g2Route, gRoute, authRoute, userRoute, userUpdateRoute);

module.exports = router;
