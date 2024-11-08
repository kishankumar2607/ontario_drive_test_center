const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const g2Controller = require("../../controllers/g2Controllers/g2Controllers")

// Route to render the G2 booking page
router.get("/g2", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.getG2Page);

// Route to handle the G2 booking form submission
router.post("/g2", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.postG2Booking);

module.exports = router;
