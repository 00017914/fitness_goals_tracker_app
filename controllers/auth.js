const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register handler
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array() }); // Render register page with errors
    }

    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.render('register', { message: 'User already exists' }); // Display message if user exists
        }

        // Create new user
        user = new User({ name, email, password });
        await user.save();

        // Generate JWT token (optional here)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect to login page after successful registration
        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login handler
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('login', { errors: errors.array() }); // Render login page with errors
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { message: 'Invalid credentials' }); // Display message if user not found
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { message: 'Invalid credentials' }); // Display message if password does not match
        }

        // Generate JWT token (optional)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store user info in session or cookies (if using session)
        req.session.userId = user._id;
        req.session.username = user.name;

        // Redirect to the dashboard or any other protected page
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
