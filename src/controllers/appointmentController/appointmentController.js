const Appointment = require("../../models/appointmentModel/appointmentModel");

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


// Display all appointment slots
exports.getAllSlots = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });

    // Group appointments by date
    const groupedSlots = appointments.reduce((acc, appointment) => {
      // Convert appointment.date to a Date object if it's not already
      const appointmentDate = new Date(appointment.date);

      // Format the date string to a readable format
      const dateKey = appointmentDate.toDateString();

      // Group by date
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(appointment);

      return acc;
    }, {});

    res.render("slots", {
      title: "All Appointment Slots",
      groupedSlots,
    });
  } catch (error) {
    console.error("Error fetching appointment slots:", error);
    res.status(500).send("Server error");
  }
};
