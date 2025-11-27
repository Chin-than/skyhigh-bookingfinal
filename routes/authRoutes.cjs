// File: routes/authRoutes.cjs

const express = require('express');
const router = express.Router(); // ✅ router is defined here FIRST
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User.cjs'); 

// Secret key for JWT (use process.env in a real app!)
const JWT_SECRET = 'your_super_secret_jwt_key';

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword 
        });

        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during signup');
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials (Email)' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials (Password)' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email,
                phone: user.phone,
                dob: user.dob,
                address: user.address,
                gender: user.gender,
                nationality: user.nationality,
            } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during login');
    }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', async (req, res) => {
    const { id, name, email, phone, dob, address, gender, nationality } = req.body;

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        if (gender) user.gender = gender;
        if (nationality) user.nationality = nationality;
        if (email) user.email = email;

        await user.save();

        const updatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            address: user.address,
            gender: user.gender,
            nationality: user.nationality,
        };

        res.json({ msg: 'Profile updated successfully', user: updatedUser });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during profile update');
    }
});

module.exports = router; // ✅ Export router at the VERY END