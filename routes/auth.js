const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/auth'); // Make sure this points to the correct file

const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
    res.render('login'); // Render login page
});

// Handle login POST request
router.post('/login', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists()
], authController.login); // Use login method from authController

// Render register page
router.get('/register', (req, res) => {
    res.render('register'); // Render register page
});

// Handle register POST request
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], authController.register); // Use register method from authController

module.exports = router;
