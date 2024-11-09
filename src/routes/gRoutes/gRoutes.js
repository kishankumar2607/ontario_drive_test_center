const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const gController = require("../../controllers/gControllers/gControllers");

// Route to render the G test booking page
router.get("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.getGPage);

// Route to handle retrieval of user data by license number
router.post("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.updateCarInfo);

module.exports = router;