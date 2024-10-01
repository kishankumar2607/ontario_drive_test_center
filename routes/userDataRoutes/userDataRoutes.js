const express = require("express");
const router = express.Router();
const User = require("../../models/userModel/userModel");

// Handle retrieval of user data
router.post("/user-data", async (req, res) => {
  const licenseNumber = req.body.licenseNumber;
  
  try {
    const user = await User.findOne({ licenseNumber });

    if (!user) {
      // Redirect to URL with license number if user is not found
      return res.redirect(`/user-data/${licenseNumber}`);
    }

    // Redirect to URL with license number if user is found
    res.redirect(`/user-data/${licenseNumber}`);
  } catch (error) {
    console.error(error);
    res.redirect("/g");
  }
});

// Route to handle displaying user data or error message
router.get("/user-data/:licenseNumber", async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    const user = await User.findOne({ licenseNumber });

    if (!user) {
      // Render 'no_user.ejs' if user is not found
      return res.render('no_user', { title: 'No User Found', licenseNumber });
    }

    // Render 'user_data.ejs' if user is found, passing user data
    res.render('user_data', { user });
  } catch (error) {
    console.error(error);
    res.redirect("/g");
  }
});

module.exports = router;
