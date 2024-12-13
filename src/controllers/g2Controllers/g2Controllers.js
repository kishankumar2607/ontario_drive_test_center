
const Appointment = require("../../models/appointmentModel/appointmentModel");
const User = require('../../models/userModel/userModel');
const moment = require('moment');
const { encrypt, decrypt } = require('../../utils/encryptDecrypt');
const { mongoose } = require("mongoose");


// Controller to render the G2 test booking page and display user data
exports.getG2Page = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId).populate("appointmentId");

    if (user && user.licenseNumber !== "default") {
      // Decrypt the licenseNumber
      user.licenseNumber = decrypt(user.licenseNumber);
    }

    let appointmentDetails = null;
    let availableSlots = [];

    if (user && user.appointmentId) {
      // User has a booked appointment
      appointmentDetails = {
        date: moment(user.appointmentId.date).format("DD/MM/YYYY"),
        time: user.appointmentId.time,
      };
    } else {
      // Fetch available slots for today if no appointment is booked
      const today = moment().format("YYYY-MM-DD");
      availableSlots = await Appointment.find({
        date: today,
        isTimeSlotAvailable: true,
      }).sort({ time: 1 });
    }

    res.render("g2_page", {
      title: "G2 Test Booking | Schedule Your G2 License Test",
      user: user && user.licenseNumber !== "default" ? user : null,
      buttonText: user && user.licenseNumber !== "default" ? "Update Information" : "Submit Request",
      appointmentDetails,
      availableSlots,
      messages: req.flash(),
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

  // Check if appointmentId is valid
  const validAppointmentId =
    appointmentId && mongoose.Types.ObjectId.isValid(appointmentId)
      ? appointmentId
      : null;

  if (licenseNumber !== "default") {
    const existingUser = await User.findOne({ licenseNumber });
    if (existingUser && existingUser._id.toString() !== userId) {
      req.flash("error", "This license number is already in use.");
      return res.redirect("/g2");
    }
  }

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
      appointmentId: validAppointmentId,
      testType: "G2",
    });

    // Mark the selected appointment slot as unavailable
    if (validAppointmentId) {
      await Appointment.findByIdAndUpdate(validAppointmentId, {
        isTimeSlotAvailable: false,
      });
    }

    res.redirect("/g2");
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

    res.redirect("/g2");
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
    // Mark the appointment slot as available
    await Appointment.findByIdAndUpdate(appointmentId, {
      isTimeSlotAvailable: true,
    });

    // Remove the appointment from the user record
    await User.findByIdAndUpdate(userId, { $unset: { appointmentId: "" } });

    req.flash("success", "Appointment canceled successfully.");
    res.redirect("/g2");
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send("Server error");
  }
};

