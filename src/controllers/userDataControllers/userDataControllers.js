
const User = require('../../models/userModel/userModel');

// Function to fetch user by license number
const getUserByLicenseNumber = async (licenseNumber) => {
    return await User.findOne({ licenseNumber });
};

// Function to handle user data retrieval
exports.retrieveUserData = async (req, res) => {
    const licenseNumber = req.body.licenseNumber;

    try {
        const user = await getUserByLicenseNumber(licenseNumber);

        if (!user) {
            return res.redirect(`/user-data/${licenseNumber}`);
        }

        res.redirect(`/user-data/${licenseNumber}`);
    } catch (error) {
        console.error(error);
        res.redirect("/g");
    }
};

// Function to handle user data display
exports.displayUserData = async (req, res) => {
    const { licenseNumber } = req.params;

    try {
        const user = await getUserByLicenseNumber(licenseNumber);

        if (!user) {
            return res.render('no_user', { title: 'No User Found', licenseNumber });
        }

        res.render('user_data', { user });
    } catch (error) {
        console.error(error);
        res.redirect("/g");
    }
};

// Function to delete user
// exports.deleteUser = async (req, res) => {
//     const { licenseNumber } = req.params;

//     try {
//         await User.deleteOne({ licenseNumber });
//         res.status(200).json({ message: 'User deleted successfully.' });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };