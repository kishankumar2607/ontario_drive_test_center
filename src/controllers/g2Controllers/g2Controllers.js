
const User = require('../../models/userModel/userModel');

exports.getG2Page = (req, res) => {
    res.render("g2_page", {
        title: "G2 Test Booking | Schedule Your G2 License Test",
    });
};


exports.postG2Booking = async (req, res) => {
    const { firstName, lastName, licenseNumber, age, dob, make, model, year, plateNumber } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        licenseNumber,
        age,
        dob,
        car_details: {
            make,
            model,
            year,
            plateNumber,
        },
    });

    try {
        await newUser.save();
        res.redirect("/g");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Server error");
    }
};
