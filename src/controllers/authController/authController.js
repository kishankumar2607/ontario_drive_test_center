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
  res.render("login", { title: "Login | Access Your Drive Test Account" });
};

// Render Signup Page
exports.renderSignupPage = (req, res) => {
  res.render("signup", { title: "Signup | Create Your Drive Test Account" });
};

// Handle Signup Form Submission
exports.signup = async (req, res) => {
  const { username, password, repeatPassword, UserType } = req.body;

  // Validate password match
  if (password !== repeatPassword) {
    return res.status(400).render('signup', { title: 'Signup', message: 'Passwords do not match' });
  }

  try {
    // Check if username already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).render('signup', { title: 'Signup', message: 'Username already exists' });
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
    res.redirect('/login');
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send('Server error');
  }
};

// Handle Login Form Submission
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).render('login', { title: 'Login', message: 'User not found. Please sign up.' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', { title: 'Login', message: 'Invalid credentials.' });
    }

    // Set session variables
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.userType = user.userType;

    // console.log("Session Data:", req.session);

    // console.log("userId: " + req.session.userId);
    // console.log("username: " + req.session.username);
    // console.log("userType: " + req.session.userType);


    // Redirect based on user type
    res.redirect(user.userType === 'Driver' ? '/g' : '/');
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Server error');
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
