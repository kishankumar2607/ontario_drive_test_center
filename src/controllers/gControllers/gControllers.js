
const Appointment = require("../../models/appointmentModel/appointmentModel");
const User = require("../../models/userModel/userModel");
const moment = require('moment');
const { decrypt } = require("../../utils/encryptDecrypt");


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
        const formattedDob = moment(user.dob).format('MM/DD/YYYY');

        // Fetch the user's booked appointment
        const bookedAppointment = await Appointment.findById(user.appointmentId);

        let appointmentDetails = null;
        let availableSlots = [];

        if (bookedAppointment) {
            // If user has a booked appointment, prepare its details
            appointmentDetails = {
                date: moment(bookedAppointment.date).format("MM/DD/YYYY"),
                time: bookedAppointment.time,
            };
        } else {
            // Fetch available slots for the current date if no appointment is booked
            const today = moment().format("YYYY-MM-DD");
            availableSlots = await Appointment.find({
                date: today,
                isTimeSlotAvailable: true,
            }).sort({ time: 1 }); // Sort by time for better display
        }

        res.render("g_page", {
            title: "G Test Booking | Apply for Your G License Exam",
            user,
            formattedDob,
            decryptedLicenseNumber,
            appointmentDetails,
            availableSlots,
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send("Server error");
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

