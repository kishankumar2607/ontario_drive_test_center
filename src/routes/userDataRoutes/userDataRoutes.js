const express = require("express");
const router = express.Router();
const userDataController = require("../../controllers/userDataControllers/userDataControllers");

// Route to handle user data retrieval
router.post("/user-data", userDataController.retrieveUserData);

// Route to display user data
router.get("/user-data/:licenseNumber", userDataController.displayUserData);

// Route to delete a user
// router.delete('/delete_user/:licenseNumber', userDataController.deleteUser);


module.exports = router;
