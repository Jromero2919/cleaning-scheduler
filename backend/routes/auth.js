const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).send({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.send({ message: 'User registered', token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
