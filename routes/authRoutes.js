const { Router } = require('express');
const bcrypt = require('bcrypt'); // Bcrypt for encrypting password
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // input validation library

// controller file -> MVC organization pattern
const authController = require('../controllers/authController');

const router = Router();

// Import User schema from mongoose
const User = require('../models/User');

// @route POST api/signup
// @desc Register user
router.post('/signup', [
    check('screen_name', 'Full name is required').not().isEmpty(), // check if screen_name has a value
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })  // check password length
], async (req, res) => {
    const errors = validationResult(req); // check() returns errors to above conditions as an Array in validationResult(req)
    
    // Return error status and an object with validation errors array
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    // req.body fields 
    let { 
        screen_name, 
        password 
    } = req.body;

    screen_name = screen_name.toLowerCase(); //

    try {
        // See if user exists
        let user = await User.findOne({ screen_name });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'This email already exists' }] });
        }

        // Get fields
        const userFields = {};
        if(screen_name) userFields.screen_name = screen_name;
        userFields.password = password;

        // Create new user in MongoDB
        user = new User(userFields);

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create token to tell client user is authenticated
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            "mysecrettoken",
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

// @route POST api/auth
// @desc Authenticate user & get token (Login)
// @access Public
router.post('/login', [
    check('screen_name', 'Full name is required').not().isEmpty(), // check if screen_name has a value
    check('password', 'Password is required').exists() // check password
], async (req, res) => {
    const errors = validationResult(req); // check() returns errors to above conditions as an Array in validationResult(req)
    
    // Return error status and an object with validation errors array
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    let { screen_name, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ screen_name });

        //  If user doesn't exist return error
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Compare passwords to login user
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match return error
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Create token to tell client user is authenticated
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            "mysecrettoken",
            { expiresIn: 360000 }, // 6 minutes
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

module.exports = router;