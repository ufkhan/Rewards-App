const express = require('express');
const Record = require('../models/recordModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// @desc Retrieve records
// @Params [Headers Authorization Token]
// @route GET /api/records
// @access Public
router.get('/', async (req, res) => {
    console.log("REQUEST: ", req.headers)
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const records = await Record.find({ user: user.id });
    res.json(records);
})


// @desc Set records
// @Params [Headers Authorization Token, Amount Value]
// @route POST /api/records
// @access Public
router.post('/', async (req, res) => {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const record = await Record.create({ 
        amount: req.body.amount,
        user: user.id
    });
    res.json(record);
})

module.exports = router;