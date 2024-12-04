const User = require("../../models/userModel/userModel");

// Controller to render the examiner dashboard page and display driver data
exports.getExaminerPage = async (req, res) => {
  const { filter } = req.query;

  try {
    const query = { userType: "Driver" };
    if (filter) {
      query.testType = filter;
    }

    const drivers = await User.find(query, "firstName lastName car_details testType comment passFail");

    res.render("examiner", {
      title: "Examiner Dashboard",
      drivers,
      filter,
      messages: req.flash(),
    });
  } catch (error) {
    console.error("Error fetching drivers for Examiner:", error);
    req.flash("error", "Failed to fetch drivers.");
    res.redirect("/");
  }
};


// Update Driver Test Results
exports.updateDriverTest = async (req, res) => {
  const { driverId, comment, passFail } = req.body;

  try {
    await User.findByIdAndUpdate(driverId, {
      comment,
      passFail: passFail === "true", // Convert string to boolean
    });

    req.flash("success", "Driver test results updated successfully.");
    res.redirect("/examiner");
  } catch (error) {
    console.error("Error updating driver test results:", error);
    req.flash("error", "Failed to update driver test results.");
    res.redirect("/examiner");
  }
};
