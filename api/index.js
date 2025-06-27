
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
require("../src/helpers/connection");
const app = express();
const server = require("../src/server")

app.use(server);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});