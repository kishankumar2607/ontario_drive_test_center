const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const gController = require("../../controllers/gControllers/gControllers");

// Route to render the G test booking page
router.get("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.getGPage);


// currently I am not using below routes

// Route to handle retrieval of user data by license number
// router.post("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.postGBooking);

// Route to handle updating car information
// router.post("/g/update", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.updateCarInfo);

module.exports = router;