const User = require("../../models/userModel/userModel");
const moment = require('moment');

// Controller to render the G test booking page and display user data
exports.getGPage = async (req, res) => {
    try {
        const userId = req.session.userId;

        // console.log("user id in get method in g controller: " + userId);

        const user = await User.findById(userId);

        console.log("g controller data", user);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Format the DOB to a human-readable format (e.g., MM/DD/YYYY)
        const formattedDob = moment(user.dob).format('MM/DD/YYYY');

        res.render("g_page", {
            title: "G Test Booking | Apply for Your G License Exam",
            user,
            formattedDob
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
