const mongoose = require("mongoose");
const db = mongoose.connection;

const uri = "mongodb+srv://kdas5646:Kishan%402607@kishandb.iyeze.mongodb.net/?retryWrites=true&w=majority&appName=KishanDB";

// Database connection with MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

db.on("open", () => {
  console.log("Database is open");
});

db.on("error", (err) => {
  console.log(err);
});

db.on("close", () => {
  console.log("Database is closing...");
});
