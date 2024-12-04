const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const gController = require("../../controllers/gControllers/gControllers");

// Route to render the G test booking page
router.get("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.getGPage);

// Route to handle retrieval of user data by license number
router.post("/g", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.updateCarInfo);

// Route to handle booking a G Test slot
router.post("/g/book-slot", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.bookGSlot);

// Route to handle canceling a G Test appointment
router.post("/g/cancel-appointment", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.cancelGAppointment);

// Route to view available slots
router.get("/slots-booking", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.viewAvailableSlots);

// Route to fetch available slots dynamically
router.get("/g/available-slots", authMiddleware.isAuthenticated, authMiddleware.isDriver, gController.getAvailableSlots);


module.exports = router;