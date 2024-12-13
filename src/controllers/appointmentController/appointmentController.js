const Appointment = require("../../models/appointmentModel/appointmentModel");
const User = require("../../models/userModel/userModel");
const moment = require("moment");


// Render the appointment management page
exports.getAppointmentPage = async (req, res) => {

  const { date } = req.query;
  const selectedDate = date || new Date().toISOString().split('T')[0];

  try {
    // Fetch all booked slots for the selected date
    const appointments = await Appointment.find({ date: selectedDate });
    const bookedSlots = appointments.map((appointment) => appointment.time);

    console.log("appointments slots", appointments);
    console.log("Booked slots", bookedSlots);
      
    res.render("appointment", {
      title: "Manage Appointments",
      appointments,
      bookedSlots,
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    console.error("Error fetching appointment page:", error);
    req.flash("error", "Failed to load appointments.");
    res.redirect("/");
  }
};


// Handle the addition of new appointment slots
exports.addAppointmentSlot = async (req, res) => {
  const { date, time } = req.body;

  try {
    // Check if the date is in the past
    const today = moment().startOf("day");
    const slotDate = moment(date);

    if (slotDate.isBefore(today)) {
      req.flash('error', 'Cannot add a slot for a past date.');
      return res.redirect('/appointment');
    }


    // Check if the slot already exists for the given date and time
    const existingSlot = await Appointment.findOne({ date, time });
    if (existingSlot) {
      req.flash('error', 'This time slot is already booked for the selected date.');
      return res.redirect('/appointment');
    }

    // If no duplicate found, create the new appointment
    const newAppointment = new Appointment({ date, time, isTimeSlotAvailable: true });
    await newAppointment.save();

    req.flash('success', 'Appointment slot added successfully.');
    res.redirect('/appointment');
  } catch (error) {
    console.error("Error adding appointment slot:", error);
    req.flash('error', 'An error occurred while adding the appointment slot.');
    res.redirect('/appointment');
  }
};


// Display all appointment slots, removing past slots
exports.getAllSlots = async (req, res) => {
  try {

    const today = moment().startOf("day");

    // Delete all appointments that are strictly before today's date
    await Appointment.deleteMany({
      date: { $lt: today.format("YYYY-MM-DD") },
    });

    // Fetch the remaining appointments sorted by date and time
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });

    // Group appointments by date
    const groupedSlots = appointments.reduce((acc, appointment) => {
      const appointmentDate = moment(appointment.date);
      const dateKey = appointmentDate.format("dddd MMM DD YYYY");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(appointment);

      return acc;
    }, {});

    res.render("slots", {
      title: "All Appointment Slots",
      groupedSlots,
      messages: {
        success: req.flash("success"),
        error: req.flash("error"),
      },
    });
  } catch (error) {
    console.error("Error fetching appointment slots:", error);
    req.flash("error", "Failed to fetch appointment slots.");
    res.redirect("/");
  }
};

//delete appointment slots
exports.deleteSlot = async (req, res) => {
  const slotId = req.params.id;

  try {
    await Appointment.findByIdAndDelete(slotId);
    req.flash("success", "Appointment slot deleted successfully.");
    res.redirect("/slots");
  } catch (error) {
    console.error("Error deleting appointment slot:", error);
    req.flash("error", "Failed to delete appointment slot.");
    res.redirect("/slots");
  }
};


// Admin: View Pass/Fail Candidates
exports.viewPassFailCandidates = async (req, res) => {
  try {
    const candidates = await User.find(
      { userType: "Driver", passFail: { $ne: null } },
      "firstName lastName car_details testType passFail comment"
    );

    res.render("status", {
      title: "Manage License Issuance",
      candidates,
      messages: req.flash(),
    });
  } catch (error) {
    console.error("Error fetching License Issuance:", error);
    req.flash("error", "Failed to load candidates.");
    res.redirect("/");
  }
};

// Admin: Update Driver Test Result
exports.updateDriverTestResult = async (req, res) => {
  const { driverId, passFail, comment } = req.body;

  try {
    await User.findByIdAndUpdate(driverId, {
      passFail: passFail === "true", // Convert string to boolean
      comment,
    });

    req.flash("success", "Driver test result updated successfully.");
    res.redirect("/status");
  } catch (error) {
    console.error("Error updating driver test result:", error);
    req.flash("error", "Failed to update test result.");
    res.redirect("/status");
  }
};
