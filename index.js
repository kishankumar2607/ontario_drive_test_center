
const express = require('express');
require("./helper/connection")
const app = express();
const server = require("./server")

app.use(server);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});