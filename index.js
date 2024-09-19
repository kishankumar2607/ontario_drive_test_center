const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/g2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'g2_page.html'));
});

app.get('/g', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'g_page.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
