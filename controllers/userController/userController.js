const User = require("../../models/userModel/userModel");

// Handle G2 Form Submission
const createUser = async (req, res) => {
  console.log(req.body);
  const {
    firstname,
    lastname,
    licenseNumber,
    age,
    dob,
    carMake,
    carModel,
    carYear,
    plateNumber,
  } = req.body;

  const user = new User({
    firstname,
    lastname,
    licenseNumber,
    age,
    dob,
    carMake,
    carModel,
    carYear,
    plateNumber,
  });

  try {
    await user.save();
    // res.redirect("/");
    console.log(user);
  } catch (error) {
    res.status(400).send("Error saving user data.");
  }
};

// Find User by License Number
const findUser = async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    const user = await User.findOne({ licenseNumber });
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error fetching user data.");
  }
};

// Update Car Information
const updateCarInfo = async (req, res) => {
  const { licenseNumber, carMake, carModel, carYear, plateNumber } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { licenseNumber },
      {
        $set: {
          "car_details.make": carMake,
          "car_details.model": carModel,
          "car_details.year": carYear,
          "car_details.platno": plateNumber,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("Error updating car information.");
  }
};

// Delete User by License Number
const deleteUser = async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    const user = await User.findOneAndDelete({ licenseNumber });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    res.status(500).send("Error deleting user data.");
  }
};

module.exports = {
  createUser,
  findUser,
  updateCarInfo,
  deleteUser,
};
