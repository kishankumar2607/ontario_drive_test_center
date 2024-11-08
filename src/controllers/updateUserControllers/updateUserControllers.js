
const User = require('../../models/userModel/userModel');

// Controller to handle fetching a user by license number for updating
exports.getUserByLicenseNumber = async (req, res) => {
    const { licenseNumber } = req.params;

    try {
        const user = await User.findOne({ licenseNumber });

        if (!user) {
            return res.render("no_user", { title: "No User Found", licenseNumber });
        }

        res.render("update_user", { user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.redirect("/g");
    }
};

// Controller to handle updating car information
exports.updateCarInfo = async (req, res) => {
    const { make, model, year, plateNumber, licenseNumber } = req.body;

    try {
        await User.updateOne(
            { licenseNumber },
            {
                "car_details.make": make,
                "car_details.model": model,
                "car_details.year": year,
                "car_details.plateNumber": plateNumber,
            }
        );

        return res.redirect(`/user-data/${licenseNumber}`);
    } catch (error) {
        console.error("Error updating car info:", error);
        res.status(500).send("Internal Server Error");
    }
};
