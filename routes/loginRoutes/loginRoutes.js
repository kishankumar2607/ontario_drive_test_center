const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login | Access Your Drive Test Account" });
});

module.exports = router;
