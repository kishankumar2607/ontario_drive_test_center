const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
