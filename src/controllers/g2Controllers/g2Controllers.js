
const User = require('../../models/userModel/userModel');
const moment = require('moment');

// Controller to render the G2 test booking page and display user data
exports.getG2Page = async (req, res) => {
    const userId = req.session.userId;
    // console.log("user id in get method in g2 controller: " + userId);

    try {
        const user = await User.findById(userId);

        if (user && user.licenseNumber === "default") {
            res.render("g2_page", {
                title: "G2 Test Booking | Schedule Your G2 License Test",
                user: null
            });
        } else {
            res.render("g2_page", {
                title: "G2 Test Booking | Schedule Your G2 License Test",
                user: user
            });
        }
    } catch (error) {
        console.error("Error retrieving G2 page:", error);
        res.status(500).send("Server error");
    }
};


// Controller to handle booking a G2 test
exports.postG2Booking = async (req, res) => {
    const userId = req.session.userId;
    // console.log("user id in post method in g2 controller: " + userId);

    const { firstName, lastName, licenseNumber, age, dob, make, model, year, plateNumber } = req.body;

    const formattedDob = moment(dob).isValid() ? moment(dob).format('YYYY-MM-DD') : null;

    try {
        await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            licenseNumber,
            age,
            dob : formattedDob,
            car_details: {
                make,
                model,
                year,
                plateNumber,
            },
        });
        res.redirect("/g");
    } catch (error) {
        console.error("Error updating user G2 booking data:", error);
        res.status(500).send("Server error");
    }
};
