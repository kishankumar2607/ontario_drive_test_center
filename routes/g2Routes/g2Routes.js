const express = require("express");
const router = express.Router();
const User = require("../../models/userModel/userModel"); // Import User model

// Route to render G2 page
router.get("/g2", (req, res) => {
  res.render("g2_page", {
    title: "G2 Test Booking | Schedule Your G2 License Test",
  });
});

// Route to handle G2 form submission
router.post("/g2", async (req, res) => {
  const { firstName, lastName, licenseNumber, age, dob, make, model, year, plateNumber } = req.body;

  // Create a new user instance
  const newUser = new User({
    firstName,
    lastName,
    licenseNumber,
    age,
    dob,
    car_details: {
      make,
      model,
      year,
      plateNumber,
    },
  });

  try {
    await newUser.save(); // Save to database
    res.redirect("/g"); // Redirect to G page after successful save
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
