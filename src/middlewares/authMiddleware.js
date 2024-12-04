

// Middleware for authentication
module.exports = {
    isAuthenticated: (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        next();
    },

    // Middleware for Driver access 
    isDriver: (req, res, next) => {
        if (req.session.userType === 'Driver') {
            return next();
        }
        res.redirect('/login');
    },

    // Middleware for Admin access
    isAdmin: (req, res, next) => {
        if (req.session.userType === 'Admin') {
            return next();
        }
        res.redirect('/login');
    },

    // Middleware for Examiner access
    isExaminer: (req, res, next) => {
        if (req.session.userType === 'Examiner') {
            return next();
        }
        res.redirect('/login');
    }
};
