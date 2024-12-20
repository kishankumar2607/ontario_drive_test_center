const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User model
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: 'default',
  },
  lastName: {
    type: String,
    required: true,
    default: 'default',
  },
  licenseNumber: {
    type: String,
    required: true,
    default: "default",
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  userType: {
    type: String,
    enum: ["Driver", "Admin", "Examiner"],
    default: "Driver"
  },
  dob: {
    type: String,
    required: true,
  },
  car_details: {
    make: {
      type: String,
      required: true,
      default: 'default',
    },
    model: {
      type: String,
      required: true,
      default: 'default',
    },
    year: {
      type: String,
      required: true,
      default: 0,
    },
    plateNumber: {
      type: String,
      required: true,
      default: 'default',
    },
  },
  testType: {
    type: String,
    enum: ['G2', 'G'],
    default: null,
  },
  comment: {
    type: String,
    default: '',
  },
  passFail: {
    type: Boolean,
    default: null,
  },
  appointmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Appointment" 
  },
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
