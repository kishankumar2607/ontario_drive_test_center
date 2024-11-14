const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const g2Controller = require("../../controllers/g2Controllers/g2Controllers");

// Route to render the G2 booking page
router.get("/g2", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.getG2Page);

// Route to handle the G2 booking form submission
router.post("/g2", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.postG2Booking);

// Route to fetch available slots for a given date
router.get("/g2/available-slots", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.getAvailableSlots);

// Route to handle booking an appointment slot
router.post("/g2/book-slot", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.bookSlot);

// Route to delete slot for a given date
router.post("/g2/delete-appointment", authMiddleware.isAuthenticated, authMiddleware.isDriver, g2Controller.deleteAppointment);

module.exports = router;
