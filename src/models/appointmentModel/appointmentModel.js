const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Appointment model
const appointmentSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    },
});


const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
