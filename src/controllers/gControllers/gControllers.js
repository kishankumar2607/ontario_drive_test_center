
const Appointment = require("../../models/appointmentModel/appointmentModel");
const User = require("../../models/userModel/userModel");
const moment = require('moment');
const { decrypt } = require("../../utils/encryptDecrypt");
const { mongoose } = require("mongoose");


// Controller to render the G test booking page and display user data
exports.getGPage = async (req, res) => {
    try {
        const userId = req.session.userId;

        // console.log("user id in get method in g controller: " + userId);

        const user = await User.findById(userId);

        // console.log("g controller data", user);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Decrypt the licenseNumber
        let decryptedLicenseNumber = null;

        if (user.licenseNumber && user.licenseNumber !== "default") {
            decryptedLicenseNumber = decrypt(user.licenseNumber);
        }

        // Format the DOB to a human-readable format (e.g., MM/DD/YYYY)
        const formattedDob = moment(user.dob).format('DD/MM/YYYY');

        // Fetch the user's booked appointment
        const bookedAppointment = await Appointment.findById(user.appointmentId);

        let appointmentDetails = null;
        let availableSlots = [];

        if (bookedAppointment) {
            // If user has a booked appointment, prepare its details
            appointmentDetails = {
                date: moment(bookedAppointment.date).format("DD/MM/YYYY"),
                time: bookedAppointment.time,
            };
        } else {
            // Fetch available slots for the current date if no appointment is booked
            const today = moment().format("YYYY-MM-DD");
            availableSlots = await Appointment.find({
                date: today,
                isTimeSlotAvailable: true,
            }).sort({ time: 1 });
        }

        // Set the testType to "G" for the user if not already set
        if (user.testType !== "G") {
            await User.findByIdAndUpdate(userId, { testType: "G" });
        }

        res.render("g_page", {
            title: "G Test Booking | Apply for Your G License Exam",
            user,
            formattedDob,
            decryptedLicenseNumber,
            appointmentDetails,
            availableSlots,
            messages: req.flash(),
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send("Server error");
    }
};


// Controller to handle booking a G Test appointment slot
exports.bookGSlot = async (req, res) => {
    const userId = req.session.userId;
    const { appointmentId } = req.body;

    console.log("User ID:", userId);
    console.log("Appointment ID:", appointmentId);

    try {
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            console.error("Invalid appointment ID:", appointmentId);
            return res.status(400).json({ error: "Invalid appointment ID" });
        }

        const updatedSlot = await Appointment.findByIdAndUpdate(appointmentId, {
            isTimeSlotAvailable: false,
        });

        if (!updatedSlot) {
            console.error("Appointment slot not found:", appointmentId);
            return res.status(404).json({ error: "Appointment slot not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            appointmentId,
            testType: "G",
        });

        if (!updatedUser) {
            console.error("User not found:", userId);
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Controller to handle canceling a G Test appointment
exports.cancelGAppointment = async (req, res) => {
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
        res.redirect("/g");
    } catch (error) {
        console.error("Error canceling G Test appointment:", error);
        req.flash("error", "Failed to cancel the appointment.");
        res.redirect("/g");
    }
};


// Controller to handle updating car information
exports.updateCarInfo = async (req, res) => {
    const userId = req.session.userId;

    // console.log("user id in post method in g controller: " + userId);

    const { make, model, year, plateNumber } = req.body;

    try {
        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "car_details.make": make || 'default',
                    "car_details.model": model || 'default',
                    "car_details.year": year || '0',
                    "car_details.plateNumber": plateNumber || 'default',
                },
            },
            { new: true }
        );
        res.redirect("/g");
    } catch (error) {
        console.error("Error updating car information:", error);
        res.status(500).send("Server error");
    }
};


//View all available slot
exports.viewAvailableSlots = async (req, res) => {
    try {
        const selectedDate = req.query.date || moment().format("YYYY-MM-DD");

        const availableSlots = await Appointment.find({
            date: selectedDate,
            isTimeSlotAvailable: true,
        }).sort({ time: 1 });

        const groupedSlots = availableSlots.reduce((acc, slot) => {
            const date = moment(slot.date).format("YYYY-MM-DD");
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(slot);
            return acc;
        }, {});

        res.render("slots-booking", {
            title: "Available Slots",
            selectedDate,
            availableSlots,
            groupedSlots,
            messages: req.flash(),
        });
    } catch (error) {
        console.error("Error fetching slots:", error);
        req.flash("error", "Failed to load slots.");
        res.redirect("/g");
    }
};


//Get all slots
exports.getAvailableSlots = async (req, res) => {
    const { date } = req.query;

    try {
        const slots = await Appointment.find({ date, isTimeSlotAvailable: true });
        console.log("Available slots:", slots); // Debugging log
        res.json(slots);
    } catch (error) {
        console.error("Error fetching slots:", error);
        res.status(500).json({ error: "Failed to fetch slots" });
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
