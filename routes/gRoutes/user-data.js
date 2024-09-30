const express = require('express');
const router = express.Router();
const User = require('../../models/userModel/userModel'); // Adjust path as needed

// Handle retrieval of user data
router.post('/g/user-data', async (req, res) => {
  const licenseNumber = req.body.licenseNumber;
  try {
    const user = await User.findOne({ licenseNumber });

    // Check if user exists
    if (!user) {
      return res.render('no_user'); // Render a separate page for no user found
    }

    // Render the user data on a new page
    res.render('user_data', { user });
  } catch (error) {
    console.error(error);
    res.redirect('/g'); // Redirect to G page on error
  }
});

module.exports = router;
