

const Appointment = require("../../models/appointmentModel/appointmentModel");
const User = require('../../models/userModel/userModel');
const moment = require('moment');
const { encrypt, decrypt } = require('../../utils/encryptDecrypt');


// Controller to render the G2 test booking page and display user data
exports.getG2Page = async (req, res) => {

  const userId = req.session.userId;

  // console.log("user id in get method in g2 controller: " + userId);

  try {
    const user = await User.findById(userId);

    if (user && user.licenseNumber !== "default") {
      // Decrypt the licenseNumber
      user.licenseNumber = decrypt(user.licenseNumber);
    }

    res.render("g2_page", {
      title: "G2 Test Booking | Schedule Your G2 License Test",
      user: user && user.licenseNumber !== "default" ? user : null,
      buttonText: user && user.licenseNumber !== "default" ? "Update Information" : "Submit Request",
    });

  } catch (error) {
    console.error("Error retrieving G2 page:", error);
    res.status(500).send("Server error");
  }
};

// Retrieve available slots for a given date
exports.getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  try {
    const slots = await Appointment.find({ date, isTimeSlotAvailable: true });
    res.json(slots);
  } catch (error) {
    res.status(500).send("Server error");
  }
};


// Combined Controller for Booking a G2 Test and Appointment Slot
exports.postG2Booking = async (req, res) => {
  const userId = req.session.userId;

  const {
    firstName,
    lastName,
    licenseNumber,
    dob,
    make,
    model,
    year,
    plateNumber,
    appointmentId,
  } = req.body;

  const formattedDob = moment(dob).isValid() ? moment(dob).format("YYYY-MM-DD") : null;
  const age = formattedDob ? moment().diff(moment(formattedDob), "years") : null;

  // Encrypt licenseNumber before storing it in the database
  const encryptedLicense = encrypt(licenseNumber);

  try {
    // Update the user with personal details and selected appointment slot
    await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      licenseNumber: encryptedLicense,
      age,
      dob: formattedDob,
      car_details: {
        make,
        model,
        year,
        plateNumber,
      },
      appointmentId, // Store the appointment ID in the user document
    });

    // Mark the selected appointment slot as unavailable
    await Appointment.findByIdAndUpdate(appointmentId, { isTimeSlotAvailable: false });

    res.redirect("/g");
  } catch (error) {
    console.error("Error updating user G2 booking data and booking slot:", error);
    res.status(500).send("Server error");
  }
};


// Controller to book an appointment
exports.bookSlot = async (req, res) => {
  const userId = req.session.userId;
  const { appointmentId } = req.body;

  try {
    // Update the User record with the selected appointment ID
    await User.findByIdAndUpdate(userId, { appointmentId });

    // Update the Appointment record to mark the slot as unavailable
    await Appointment.findByIdAndUpdate(appointmentId, { isTimeSlotAvailable: false });

    res.redirect("/g");
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send("Server error");
  }
};


// Controller to delete an appointment from the user's record
exports.deleteAppointment = async (req, res) => {
  const userId = req.session.userId;
  const { appointmentId } = req.body;

  try {
    // Remove the appointment from the user record
    await User.findByIdAndUpdate(userId, { $unset: { appointmentId: "" } });

    // Mark the appointment slot as available
    await Appointment.findByIdAndUpdate(appointmentId, { isTimeSlotAvailable: true });

    res.redirect("/g");
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send("Server error");
  }
};

