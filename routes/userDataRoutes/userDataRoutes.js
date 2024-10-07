const express = require("express");
const router = express.Router();
const User = require("../../models/userModel/userModel");

router.post("/user-data", async (req, res) => {
  const licenseNumber = req.body.licenseNumber;

  try {
    const user = await User.findOne({ licenseNumber });

    if (!user) {
      return res.redirect(`/user-data/${licenseNumber}`);
    }

    res.redirect(`/user-data/${licenseNumber}`);
  } catch (error) {
    console.error(error);
    res.redirect("/g");
  }
});

router.get("/user-data/:licenseNumber", async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    const user = await User.findOne({ licenseNumber });

    if (!user) {
      return res.render('no_user', { title: 'No User Found', licenseNumber });
    }

    res.render('user_data', { user });
  } catch (error) {
    console.error(error);
    res.redirect("/g");
  }
});


router.delete('/delete_user/:licenseNumber', async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    await User.deleteOne({ licenseNumber });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
