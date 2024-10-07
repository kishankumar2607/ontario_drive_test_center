const express = require("express");
const router = express.Router();
const User = require("../../models/userModel/userModel");

router.get("/update_user/:licenseNumber", async (req, res) => {
    const { licenseNumber } = req.params;

    try {
        const user = await User.findOne({ licenseNumber });

        if (!user) {
            return res.render("no_user", { title: "No User Found", licenseNumber });
        }

        res.render("update_user", { user });
    } catch (error) {
        console.error(error);
        res.redirect("/g");
    }
});


router.post("/update_car_info", async (req, res) => {
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
});

module.exports = router;
