const bcrypt = require('bcrypt');
const User = require('../../models/userModel/userModel');

// Helper function to hash passwords
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Helper function to find user by username
const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

// Render Login Page
exports.renderLoginPage = (req, res) => {
  res.render("login", {
    title: "Login | Access Your Drive Test Account",
    messages: req.flash(),
  });
};

// Render Signup Page
exports.renderSignupPage = (req, res) => {
  res.render("signup", {
    title: "Signup | Create Your Drive Test Account",
    messages: req.flash(),
  });
};

// Handle Signup Form Submission
exports.signup = async (req, res) => {
  const { username, password, repeatPassword, UserType } = req.body;

  // Validate password match
  if (password !== repeatPassword) {
    req.flash("error", "Passwords do not match.");
    return res.redirect("/register");
  }

  try {
    // Check if username already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      req.flash("error", "Username already exists, Please Login.");
      return res.redirect("/register");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user with default values for optional fields
    const newUser = new User({
      username,
      password: hashedPassword,
      userType: UserType,
      firstName: 'default',
      lastName: 'default',
      licenseNumber: 'default',
      age: 0,
      dob: new Date('2000-01-01'),
      car_details: {
        make: 'default',
        model: 'default',
        year: '0',
        plateNumber: 'default'
      }
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to login page with success message
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/login");

  } catch (error) {
    console.error("Error during signup:", error);
    req.flash("error", "An unexpected error occurred during signup.");
    res.redirect("/register");
  }
};

// Handle Login Form Submission
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      req.flash('error', 'User not found. Please sign up.');
      return res.redirect('/login');
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid Username and Password.');
      return res.redirect('/login');
    }

    // Set session variables
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.userType = user.userType;

    // console.log("Session Data:", req.session);

    // console.log("userId: " + req.session.userId);
    // console.log("username: " + req.session.username);
    // console.log("userType: " + req.session.userType);

    req.flash('success', 'Login successful!');

    // Redirect based on user type
    res.redirect(user.userType === 'Driver' ? '/g' : '/');
  } catch (error) {
    console.error("Error during login:", error);
    req.flash('error', 'Server error occurred.');
    res.redirect('/login');
  }
};

// Handle Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.redirect('/login');
  });
};
