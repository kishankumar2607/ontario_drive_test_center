

// Middleware for authentication
module.exports = {
    isAuthenticated: (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        next();
    },

    isDriver: (req, res, next) => {
        if (req.session.userType === 'Driver') {
            return next();
        }
        res.redirect('/login');
    },

    isAdmin: (req, res, next) => {
        if (req.session.userType === 'Admin') {
            return next();
        }
        res.redirect('/login');
    }
};
