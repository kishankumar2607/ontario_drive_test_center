const express = require("express");
const router = express.Router();
const userController = require("../../controllers/updateUserControllers/updateUserControllers");

// Route to render the update user page by license number
router.get("/update_user/:licenseNumber", userController.getUserByLicenseNumber);

// Route to handle updating car information
router.post("/update_car_info", userController.updateCarInfo);

module.exports = router;
