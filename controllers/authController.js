// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
}
  
module.exports.login_get = (req, res) => {
    res.render('login');
}
  
module.exports.signup_post = async (req, res) => {

    res.render('user signup');
}
  
module.exports.login_post = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    let { email, password } = req.body;

    email = email.toLowerCase();

    try {
        // See if user exists
        let user = await User.findOne({ email });

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
            config.get('jwtSecret'),
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
}