const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// controller file -> MVC organization pattern
const authController = require('../controllers/authController');

const router = Router();

// Import User schema
const User = require('../models/User');

router.get('/signup', authController.signup_get);

// @route POST api/users
// @desc Register user
// @access Public
router.post('/signup', [
    check('username', 'Full name is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    let { 
        username, 
        password 
    } = req.body;

    username = username.toLowerCase();

    try {
        // See if user exists
        let user = await User.findOne({ username });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'This email already exists' }] });
        }

        // Get fields
        const userFields = {};
        if(username) userFields.username = username.toLowerCase();
        userFields.password = password;

        user = new User(userFields);

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
    check('username', 'Full name is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    let { username, password } = req.body;

    username = username.toLowerCase();

    try {
        // See if user exists
        let user = await User.findOne({ username });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

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