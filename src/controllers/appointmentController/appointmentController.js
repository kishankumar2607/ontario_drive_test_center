const Appointment = require("../../models/appointmentModel/appointmentModel");

// Render the appointment management page
exports.getAppointmentPage = (req, res) => {
    res.render("appointment", {
        title: "Manage Appointments",
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
