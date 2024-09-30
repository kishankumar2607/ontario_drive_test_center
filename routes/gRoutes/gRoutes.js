const express = require("express");
const router = express.Router();
const User = require("../../models/userModel/userModel");

// Route to render G page
router.get("/g", (req, res) => {
  res.render("g_page", {
    title: "G Test Booking | Apply for Your G License Exam",
  });
});

// Handle retrieval of user data
router.post('/g', async (req, res) => {
  const licenseNumber = req.body.licenseNumber;
  try {
    const user = await User.findOne({ licenseNumber });

    // Render G page with user data
    res.render('g_page', { user });
  } catch (error) {
    console.error(error);
    res.render('g_page', { user: null });
  }
});

// Handle updating car information
router.post('/g/update', async (req, res) => {
  const { userId, carMake, carModel } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      'car.make': carMake,
      'car.model': carModel
    });

    // Redirect back to G page with updated user data
    const updatedUser = await User.findById(userId);
    res.render('g_page', { user: updatedUser });
  } catch (error) {
    console.error(error);
    res.redirect('/g');
  }
});

module.exports = router;