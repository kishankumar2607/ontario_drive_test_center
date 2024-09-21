const express = require("express");

const app = new express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("dashboard", {
    title: "Dashboard | Manage Your G and G2 Drive Test Bookings",
  });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login | Access Your Drive Test Account" });
});

app.get("/g2", (req, res) => {
  res.render("g2_page", {
    title: "G2 Test Booking | Schedule Your G2 License Test",
  });
});

app.get("/g", (req, res) => {
  res.render("g_page", {
    title: "G Test Booking | Apply for Your G License Exam",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
