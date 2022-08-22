const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const router = express.Router();


// @desc Register User
// @Params [Name, Email, Password]
// @route POST /api/users
// @access Public
router.post('/', async (req, res) => {
    console.log("DATA COMING IN: ", req.body)
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// @desc Authenticate User
// @Params [Name, Email]
// @route POST /api/users/login
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Get User Data
// @Params [Headers Authorization Token]
// @route POST /api/users/me
// @access Private
router.get('/me', async (req, res) => {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ name: user.name });
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = router;