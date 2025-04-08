const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Set up Pug as the view engine and set the views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey', // Secret key for signing the session ID
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // For development, set secure to false (set true when using https)
}));

// Connect to MongoDB using the URI from the environment variables
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User model for registration and login (simplified version)
const User = require('./models/User');

// Home route rendering the main page
app.get('/', (req, res) => res.render('index'));

// Route for displaying the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route for handling login POST requests
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Log the input data to help debug
    console.log("Login attempt with username:", username);

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found:", username);
            return res.status(400).send('User not found');
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for user:", username);
            return res.status(400).send('Invalid credentials');
        }

        // Set session data on successful login
        req.session.userId = user._id;
        req.session.username = user.username;

        // Log successful login
        console.log("Login successful for user:", username);

        // Redirect to the dashboard or other pages
        res.redirect('/dashboard'); // Make sure you have a route for /dashboard
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).send('Error logging in');
    }
});

// Route for displaying the register page
app.get('/register', (req, res) => {
    res.render('register');
});

// Route for handling registration POST requests
app.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to the database
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Log registration success
        console.log("User registered:", username);

        // Redirect to login page after successful registration
        res.redirect('/login');
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).send('Error registering user');
    }
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();  // Proceed to the next middleware/route handler
    }
    res.redirect('/login');  // Redirect to login if not authenticated
}

// Protecting routes for goals and workouts (only accessible if logged in)
app.get('/goals', isAuthenticated, async (req, res) => {
    const Goal = require('./models/Goal');
    try {
        const goals = await Goal.find();
        res.render('goals', { goals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals' });
    }
});

app.get('/workouts', isAuthenticated, async (req, res) => {
    const Workout = require('./models/Workout');
    try {
        const workouts = await Workout.find();
        res.render('workouts', { workouts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workouts' });
    }
});

// Route for logging out (destroy session)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;
