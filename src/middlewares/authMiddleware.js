

// Middleware for authentication
module.exports = {
    isAuthenticated: (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        next();
    },

    isDriver: (req, res, next) => {
        if (req.session.userType !== 'Driver') {
            return res.status(403).send("Access denied. You do not have permission to view this page.");
        }
        next();
    }
};
