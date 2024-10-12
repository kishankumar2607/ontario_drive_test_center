exports.getDashboard = (req, res) => {
    res.render('dashboard', {
        title: "Dashboard | Manage Your G and G2 Drive Test Bookings"
    });
};