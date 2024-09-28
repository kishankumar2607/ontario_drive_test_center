const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('dashboard', {
        title: "Dashboard | Manage Your G and G2 Drive Test Bookings"
    });
});

module.exports = router;