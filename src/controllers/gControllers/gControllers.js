const User = require("../../models/userModel/userModel");

// Controller to render the G test booking page
exports.getGPage = (req, res) => {
    res.render("g_page", {
        title: "G Test Booking | Apply for Your G License Exam",
    });
};

// Controller to handle retrieval of user data by license number
exports.postGBooking = async (req, res) => {
    const licenseNumber = req.body.licenseNumber;

    try {
        const user = await User.findOne({ licenseNumber });

        res.render('g_page', { user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.render('g_page', { user: null });
    }
};

// Controller to handle updating car information
exports.updateCarInfo = async (req, res) => {
    const { userId, carMake, carModel } = req.body;

    try {
        await User.findByIdAndUpdate(userId, {
            'car.make': carMake,
            'car.model': carModel
        });

        const updatedUser = await User.findById(userId);
        res.render('g_page', { user: updatedUser });
    } catch (error) {
        console.error("Error updating car information:", error);
        res.redirect('/g');
    }
};