const express = require("express");
const router = express.Router();

router.get("/g", (req, res) => {
  res.render("g_page", {
    title: "G Test Booking | Apply for Your G License Exam",
  });
});

module.exports = router;
