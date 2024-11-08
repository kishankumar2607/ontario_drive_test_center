const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//user model
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
    unique: true,
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
    default: 'Driver'
  },
  dob: {
    type: Date,
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
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
