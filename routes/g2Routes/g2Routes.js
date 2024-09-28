const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController/userController");

router.get("/g2", (req, res) => {
  res.render("g2_page", {
    title: "G2 Test Booking | Schedule Your G2 License Test",
  });
});

router.post('/g2', userController.createUser);

module.exports = router;
