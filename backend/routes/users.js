const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users (optional filter by role)
router.get('/', async (req, res) => {
    const role = req.query.role;
    let users;
    if(role){
        users = await User.find({ role });
    } else {
        users = await User.find();
    }
    res.send(users);
});

module.exports = router;
