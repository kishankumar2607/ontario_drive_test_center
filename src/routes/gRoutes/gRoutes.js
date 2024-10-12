const express = require("express");
const router = express.Router();
const gController = require("../../controllers/gControllers/gControllers");

// Route to render the G test booking page
router.get("/g", gController.getGPage);

// Route to handle retrieval of user data by license number
router.post("/g", gController.postGBooking);

// Route to handle updating car information
router.post("/g/update", gController.updateCarInfo);

module.exports = router;