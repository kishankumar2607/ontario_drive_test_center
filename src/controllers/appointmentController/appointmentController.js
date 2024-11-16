const Appointment = require("../../models/appointmentModel/appointmentModel");
const moment = require("moment");


// Render the appointment management page
exports.getAppointmentPage = async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);

  const appointments = await Appointment.find({ date }).sort({ time: 1 });

  res.render("appointment", {
    title: "Manage Appointments",
    appointments,
    messages: {
      error: req.flash('error'),
      success: req.flash('success')
    }
  });
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