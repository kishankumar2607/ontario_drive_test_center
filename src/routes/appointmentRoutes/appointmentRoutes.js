const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const appointmentController = require("../../controllers/appointmentController/appointmentController");

// Admin-only route to render the appointment management page
router.get("/appointment", authMiddleware.isAuthenticated, authMiddleware.isAdmin, appointmentController.getAppointmentPage);

// Admin-only route to add appointment slots
router.post("/appointment", authMiddleware.isAuthenticated, authMiddleware.isAdmin, appointmentController.addAppointmentSlot);

// Route to display all slots for admins
router.get("/slots", authMiddleware.isAuthenticated, authMiddleware.isAdmin, appointmentController.getAllSlots);

module.exports = router;
