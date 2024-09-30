
const express = require("express");
const router = express.Router();
const dashboardRoute = require("../routes/dashboardRoutes/dashboardRoutes");
const g2Route = require("../routes/g2Routes/g2Routes");
const gRoute = require("../routes/gRoutes/gRoutes");
const loginRoute = require("../routes/loginRoutes/loginRoutes")
const userRoute = require("../routes/gRoutes/user-data")

router.use(
    dashboardRoute,
    g2Route,
    gRoute,
    loginRoute,
userRoute
);

module.exports = router;
